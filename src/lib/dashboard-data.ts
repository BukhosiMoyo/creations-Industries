import { prisma } from "@/lib/prisma"
import { UserRole, LeadStatus, RequestStatus, Prisma } from "@prisma/client"

export type DashboardCounts = {
    leads: number
    requests: number
    tasks: number
    documents: number
}

// Helper to filter by Role
function getRbacFilter(userId: string, role: string, entityField: string = "assignedToUserId") {
    if (role === "ADMIN") return {} // No filter
    if (role === "CLIENT") return { [entityField]: "NEVER_MATCH" } // Clients shouldn't see internal stuff (safe default)

    // STAFF / EMPLOYEE / ACCOUNTANT see:
    // 1. Assigned to them
    // 2. Unassigned (for Leads)
    // 3. Admin rules if they are managers? (Keeping simple for now: Assigned OR Unassigned)

    return {
        OR: [
            { [entityField]: userId },
            { [entityField]: null }
        ]
    }
}

export async function getDashboardCounts(userId: string, role: string): Promise<DashboardCounts> {
    if (role === "CLIENT") {
        return { leads: 0, requests: 0, tasks: 0, documents: 0 }
    }

    try {
        const [leads, requests, tasks, documents] = await Promise.all([
            // LEADS: Count "New" / "Incomplete" / "In Review" / "Awaiting Docs"
            prisma.lead.count({
                where: {
                    status: {
                        in: [LeadStatus.New, LeadStatus.Incomplete, LeadStatus.InReview, LeadStatus.AwaitingDocs, LeadStatus.Quoted]
                    },
                    // ...getRbacFilter(userId, role, "assignedToUserId") // Apply RBAC?
                    // For counters, usually we show ALL unassigned + assigned to me.
                    AND: {
                        OR: [
                            { assignedToUserId: userId },
                            { assignedToUserId: null }
                        ]
                    }
                }
            }),
            // SERVICE REQUESTS: Count Active (Not Completed/Archived)
            prisma.serviceRequest.count({
                where: {
                    status: {
                        notIn: [RequestStatus.Completed, RequestStatus.Archived]
                    },
                    AND: {
                        OR: [
                            { assignedToUserId: userId },
                            { assignedToUserId: null } // Visible to all if unassigned?
                        ]
                    }
                }
            }),
            // TASKS: Assigned to user
            prisma.task.count({
                where: {
                    assignedToUserId: userId,
                    status: "Open"
                }
            }),
            // DOCUMENTS: New uploads? (Tricky without "read" status). Just count recent?
            // Existing sidebar had badge="12". Let's return 0 for now or real count.
            prisma.document.count({
                where: {
                    uploadedByUserId: { not: userId } // Documents uploaded by others (clients)
                }
            })
        ])

        return { leads, requests, tasks, documents }
    } catch (error) {
        console.error("Error fetching dashboard counts:", error)
        return { leads: 0, requests: 0, tasks: 0, documents: 0 }
    }
}

export type LeadsFilter = {
    status?: string
    search?: string
}

export async function getLeads(userId: string, role: string, filters: LeadsFilter = {}) {
    if (role === "CLIENT") return []

    const where: Prisma.LeadWhereInput = {
        AND: [
            {
                OR: [
                    { assignedToUserId: userId },
                    { assignedToUserId: null }
                ]
            }
        ]
    }

    // Status Filter
    if (filters.status) {
        if (filters.status === "new") {
            (where.AND as any[]).push({ status: LeadStatus.New })
        } else if (filters.status === "unassigned") {
            (where.AND as any[]).push({ assignedToUserId: null })
        } else if (filters.status === "urgent") {
            (where.AND as any[]).push({ urgency: "Urgent_24_48h" })
        } else if (filters.status === "incomplete") {
            (where.AND as any[]).push({ status: LeadStatus.Incomplete })
        } else if (filters.status === "converted") {
            (where.AND as any[]).push({ status: LeadStatus.Converted })
        } else {
            // Default view: Active leads (not converted/archived)
            (where.AND as any[]).push({
                status: { notIn: [LeadStatus.Converted, LeadStatus.Archived] }
            })
        }
    } else {
        // Default View: All Active
        (where.AND as any[]).push({
            status: { notIn: [LeadStatus.Converted, LeadStatus.Archived] }
        })
    }

    // Search
    if (filters.search) {
        (where.AND as any[]).push({
            OR: [
                { firstName: { contains: filters.search, mode: "insensitive" } },
                { lastName: { contains: filters.search, mode: "insensitive" } },
                { email: { contains: filters.search, mode: "insensitive" } },
                { companyName: { contains: filters.search, mode: "insensitive" } },
                { referenceId: { contains: filters.search, mode: "insensitive" } }
            ]
        })
    }

    return await prisma.lead.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: 100,
        include: {
            assignedToUser: { select: { name: true, image: true } }
        }
    })
}



type LeadWithDetails = Prisma.LeadGetPayload<{
    include: {
        assignedToUser: true;
        documents: true;
        statusEvents: true;
        portalTokens: true;
        requests: { select: { id: true; status: true } };
        campaigns: true;
    }
}> | null

export async function getLeadDetails(userId: string, role: string, leadId: string): Promise<LeadWithDetails> {
    if (role === "CLIENT") return null

    const lead = await prisma.lead.findUnique({
        where: { id: leadId },
        include: {
            assignedToUser: true,
            documents: true,
            statusEvents: {
                orderBy: { createdAt: "desc" },
                take: 10
            },
            portalTokens: true,
            requests: { select: { id: true, status: true } },
            campaigns: true
        }
    })

    if (!lead) return null

    // RBAC Check (Can this user view this lead?)
    // Allow if admin, or assigned, or unassigned.
    // Ideally we'd use Casl or similar, but simple check here:
    if (role !== "ADMIN" && lead.assignedToUserId && lead.assignedToUserId !== userId) {
        // It's assigned to someone else.
        // Do we allow viewing? Usually in small teams yes.
        // Spec says: "Employee can see leads assigned to them... can see unassigned leads"
        // Implicitly implies they CANNOT see leads assigned to others?
        // Let's enforce strictness based on "safe default" rule.
        // "implement safe default: employees can only view assigned + unassigned"
        return null
    }

    return lead
}

type ServiceRequestWithDetails = Prisma.ServiceRequestGetPayload<{
    include: {
        assignedTo: true;
        company: true;
        documents: true;
        tasks: true;
        activities: true;
    }
}> | null

export async function getServiceRequest(userId: string, role: string, requestId: string): Promise<ServiceRequestWithDetails> {
    if (role === "CLIENT") return null // Or scoped to their company

    const request = await prisma.serviceRequest.findUnique({
        where: { id: requestId },
        include: {
            assignedTo: true,
            company: true,
            documents: true,
            tasks: true,
            activities: true
        }
    })

    if (!request) return null

    // RBAC
    if (role !== "ADMIN" && request.assignedToUserId && request.assignedToUserId !== userId) {
        return null
    }

    return request
}

export async function getStaffUsers() {
    return await prisma.user.findMany({
        where: {
            role: { in: [UserRole.ADMIN, UserRole.STAFF, UserRole.ACCOUNTANT, UserRole.EMPLOYEE] },
            status: "ACTIVE"
        },
        select: { id: true, name: true, email: true, image: true }
    })
}
