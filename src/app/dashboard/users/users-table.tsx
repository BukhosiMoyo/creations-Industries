"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { MoreHorizontal, Search, UserPlus, Filter, Shield, Mail } from "lucide-react"
import { format } from "date-fns"
import { User, UserRole, UserStatus } from "@prisma/client"

// Define a type that includes the invite structure if needed, or just use separate lists
// The current page separates them. Let's support both in one view or keep them separate?
// The prompt asked for "viewing and editing user on a separate page".
// Let's focus on the MAIN users table for now, and maybe a small section for invites or merge them?
// Merging them might be tricky since they have different IDs.
// Let's pass them as props and maybe tab them or just show users primarily.
// Actually, let's stick to the current design of separate sections but make the Users table powerful.
// Or better: Unified list? No, separate is clearer for "Pending".

interface UsersTableProps {
    users: User[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pendingInvites: any[] // TODO: Type this properly if possible, or just use any for now
}

export function UsersTable({ users, pendingInvites }: UsersTableProps) {
    const router = useRouter()
    const [search, setSearch] = React.useState("")
    const [roleFilter, setRoleFilter] = React.useState<string>("ALL")
    const [statusFilter, setStatusFilter] = React.useState<string>("ALL")

    // Filter Logic
    const filteredUsers = React.useMemo(() => {
        return users.filter(user => {
            const matchesSearch = (
                (user.name?.toLowerCase().includes(search.toLowerCase()) || "") ||
                (user.email?.toLowerCase().includes(search.toLowerCase()) || "")
            )
            const matchesRole = roleFilter === "ALL" || user.role === roleFilter
            const matchesStatus = statusFilter === "ALL" || user.status === statusFilter

            return matchesSearch && matchesRole && matchesStatus
        })
    }, [users, search, roleFilter, statusFilter])

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card p-4 rounded-lg border shadow-sm">
                <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[130px]">
                            <Filter className="mr-2 h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Roles</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                            <SelectItem value="STAFF">Staff</SelectItem>
                            <SelectItem value="EMPLOYEE">Employee</SelectItem>
                            <SelectItem value="CLIENT">Client</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px]">
                            <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Status</SelectItem>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="SUSPENDED">Suspended</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Main Users Table */}
            <div className="rounded-md border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="hidden md:table-cell">Joined</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                                    No users found matching your filters.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredUsers.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => router.push(`/dashboard/users/${user.id}`)}
                                >
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">{user.name || "Unknown"}</span>
                                            <span className="text-xs text-muted-foreground">{user.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            user.status === "ACTIVE" ? "text-emerald-600 border-emerald-200 bg-emerald-50" :
                                                user.status === "SUSPENDED" ? "text-red-600 border-red-200 bg-red-50" :
                                                    "text-gray-600"
                                        }>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                                        {format(new Date(user.createdAt), "MMM d, yyyy")}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={(e) => {
                                                e.stopPropagation()
                                                router.push(`/dashboard/users/${user.id}`)
                                            }}>
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div className="bg-muted/20 p-2 text-xs text-muted-foreground text-center border-t">
                    Showing {filteredUsers.length} of {users.length} users
                </div>
            </div>

            {/* Pending Invites Section - kept separate for clarity */}
            {pendingInvites.length > 0 && (
                <div className="mt-8 space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Mail className="h-4 w-4" /> Pending Invites
                    </h3>
                    <div className="rounded-md border bg-muted/30">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Sent</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {pendingInvites.map((invite) => (
                                    <TableRow key={invite.id}>
                                        <TableCell className="font-medium">{invite.email}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{invite.role}</Badge>
                                        </TableCell>
                                        <TableCell>{format(new Date(invite.createdAt), "MMM d, yyyy")}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-yellow-500/15 text-yellow-600 border-yellow-500/20">
                                                Pending
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            )}
        </div>
    )
}
