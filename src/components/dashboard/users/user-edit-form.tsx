"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, UserRole, UserStatus } from "@prisma/client"
import { updateUser } from "@/app/actions/user-actions"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner" // Assuming sonner or use-toast
// Let's check imports. Previous files used "@/components/ui/use-toast".
// I'll stick to use-toast to be safe.
import { useToast } from "@/components/ui/use-toast"
import { Loader2, Save, ArrowLeft } from "lucide-react"

interface UserEditFormProps {
    user: User
    currentUserId: string // To prevent editing self role if needed
}

export function UserEditForm({ user, currentUserId }: UserEditFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const [loading, setLoading] = useState(false)
    const [role, setRole] = useState<UserRole>(user.role)
    const [status, setStatus] = useState<UserStatus>(user.status)

    const handleSave = async () => {
        setLoading(true)
        try {
            const result = await updateUser(user.id, { role, status })

            if (result.success) {
                toast({
                    title: "User updated",
                    description: "User details have been saved successfully.",
                    variant: "default", // Ensure this exists or use "default"
                })
                router.refresh()
            } else {
                throw new Error("Failed to update")
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user. Please try again.",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const isSelf = user.id === currentUserId

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{user.name || "User Details"}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Access Control</CardTitle>
                        <CardDescription>Manage user role and account status.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                value={role}
                                onValueChange={(val) => setRole(val as UserRole)}
                                disabled={isSelf} // Prevent changing own role essentially locking yourself out
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ADMIN">Admin</SelectItem>
                                    <SelectItem value="STAFF">Staff</SelectItem>
                                    <SelectItem value="EMPLOYEE">Employee</SelectItem>
                                    <SelectItem value="CLIENT">Client</SelectItem>
                                </SelectContent>
                            </Select>
                            {isSelf && <p className="text-xs text-muted-foreground">You cannot change your own role.</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status">Account Status</Label>
                            <Select
                                value={status}
                                onValueChange={(val) => setStatus(val as UserStatus)}
                                disabled={isSelf}
                            >
                                <SelectTrigger id="status">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="INACTIVE">Inactive</SelectItem>
                                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t bg-muted/20 px-6 py-4">
                        <Button onClick={handleSave} disabled={loading || isSelf} className="ml-auto">
                            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Read-only profile details.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">First Name</Label>
                                <div className="font-medium text-sm">{user.firstName || "—"}</div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Last Name</Label>
                                <div className="font-medium text-sm">{user.lastName || "—"}</div>
                            </div>
                            <div className="space-y-1 col-span-2">
                                <Label className="text-xs text-muted-foreground">Email</Label>
                                <div className="font-medium text-sm">{user.email}</div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Joined</Label>
                                <div className="font-medium text-sm">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</div>
                            </div>
                            <div className="space-y-1">
                                <Label className="text-xs text-muted-foreground">Last Updated</Label>
                                <div className="font-medium text-sm">{user.updatedAt ? new Date(user.updatedAt).toLocaleDateString() : "—"}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
