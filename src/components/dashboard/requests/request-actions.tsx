'use client'

import { useState, useTransition } from "react"
import { ServiceRequest, User, RequestStatus } from "@prisma/client"
import {
    Card,
    CardContent,
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
import { updateRequestStatus, assignRequest } from "@/app/actions/crm-actions"
import { useToast } from "@/components/ui/use-toast"

interface RequestActionsProps {
    request: ServiceRequest & { assignedTo?: User | null }
    staffUsers: Pick<User, "id" | "name" | "email">[]
}

const REQUEST_STAGES: { value: RequestStatus; label: string }[] = [
    { value: "New", label: "New" },
    { value: "InProgress", label: "In Progress" },
    { value: "AwaitingDocs", label: "Awaiting Docs" },
    { value: "Submitted", label: "Submitted" },
    { value: "Completed", label: "Completed" },
    { value: "Archived", label: "Archived" },
]

export function RequestActions({ request, staffUsers }: RequestActionsProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [status, setStatus] = useState<RequestStatus>(request.status)
    const [assignee, setAssignee] = useState<string>(request.assignedToUserId || "unassigned")

    const handleStatusChange = (newStatus: RequestStatus) => {
        setStatus(newStatus)
        startTransition(async () => {
            try {
                await updateRequestStatus(request.id, newStatus)
                toast({ title: "Status updated" })
            } catch (error) {
                toast({ title: "Error updating status", variant: "destructive" })
                setStatus(request.status)
            }
        })
    }

    const handleAssignChange = (userId: string) => {
        setAssignee(userId)
        startTransition(async () => {
            try {
                await assignRequest(request.id, userId === "unassigned" ? "" : userId)
                toast({ title: "Assignee updated" })
            } catch (error) {
                toast({ title: "Error assigning user", variant: "destructive" })
            }
        })
    }

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
                        disabled={isPending}
                        value={status}
                        onValueChange={(val) => handleStatusChange(val as RequestStatus)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                            {REQUEST_STAGES.map((stage) => (
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
            </CardContent>
        </Card>
    )
}
