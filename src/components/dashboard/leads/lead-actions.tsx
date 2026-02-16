'use client'

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Lead, User, LeadStatus } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import { updateLeadStatus, assignLead, convertLeadToRequest } from "@/app/actions/crm-actions"
import { useToast } from "@/components/ui/use-toast"

interface LeadActionsProps {
    lead: Lead & { requests?: { id: string }[] }
    staffUsers: Pick<User, "id" | "name" | "email">[]
}

const LEAD_STAGES: { value: LeadStatus; label: string }[] = [
    { value: "New", label: "New" },
    { value: "Incomplete", label: "Incomplete" },
    { value: "InReview", label: "In Review" },
    { value: "AwaitingDocs", label: "Awaiting Docs" },
    { value: "Quoted", label: "Quoted" },
    { value: "Converted", label: "Converted" },
    { value: "Archived", label: "Archived" },
]

export function LeadActions({ lead, staffUsers }: LeadActionsProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState<LeadStatus>(lead.status)
    const [assignee, setAssignee] = useState<string>(lead.assignedToUserId || "unassigned")

    // Handlers
    const handleStatusChange = (newStatus: LeadStatus) => {
        setStatus(newStatus)
        startTransition(async () => {
            try {
                await updateLeadStatus(lead.id, newStatus)
                toast({ title: "Status updated" })
            } catch (error) {
                toast({ title: "Error updating status", variant: "destructive" })
                setStatus(lead.status) // Revert
            }
        })
    }

    const handleAssignChange = (userId: string) => {
        setAssignee(userId)
        startTransition(async () => {
            try {
                await assignLead(lead.id, userId === "unassigned" ? "" : userId)
                toast({ title: "Assignee updated" })
            } catch (error) {
                toast({ title: "Error assigning user", variant: "destructive" })
            }
        })
    }

    const handleConvert = () => {
        startTransition(async () => {
            try {
                const requestId = await convertLeadToRequest(lead.id)
                toast({ title: "Lead Converted!", description: "Service Request created." })
                router.push(`/dashboard/requests/${requestId}`)
            } catch (error) {
                console.error(error)
                toast({ title: "Conversion Failed", description: "Could not create request.", variant: "destructive" })
            }
        })
    }

    const isConverted = lead.status === "Converted"
    const linkedRequest = lead.requests?.[0]

    return (
        <Card>
            <CardHeader className="pb-3 border-b">
                <CardTitle className="text-base font-medium">Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
                {/* Status */}
                <div className="space-y-2">
                    <Label>Stage</Label>
                    <Select
                        disabled={isPending || isConverted}
                        value={status}
                        onValueChange={(val) => handleStatusChange(val as LeadStatus)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                            {LEAD_STAGES.map((stage) => (
                                <SelectItem key={stage.value} value={stage.value}>
                                    {stage.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Assignee */}
                <div className="space-y-2">
                    <Label>Assigned To</Label>
                    <Select
                        disabled={isPending}
                        value={assignee}
                        onValueChange={handleAssignChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Unassigned" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="unassigned">Unassigned</SelectItem>
                            {staffUsers.map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.name || user.email}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Conversion / View Request */}
                {!isConverted ? (
                    <Button
                        className="w-full mt-4"
                        onClick={handleConvert}
                        disabled={isPending}
                    >
                        {isPending ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                        )}
                        Convert to Request
                    </Button>
                ) : (
                    <div className="mt-4 space-y-2">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200 text-center text-sm font-medium flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Converted
                        </div>
                        {linkedRequest && (
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => router.push(`/dashboard/requests/${linkedRequest.id}`)}
                            >
                                View Request <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
