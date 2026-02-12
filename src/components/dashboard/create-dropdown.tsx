"use client"

import * as React from "react"
import { Plus, Building2, Briefcase, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function CreateDropdown() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" className="hidden sm:flex gap-2 font-semibold shadow-accent/20">
                    <Plus className="h-4 w-4" />
                    Create
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>New Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    New Company
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                    <Briefcase className="h-4 w-4 text-slate-500" />
                    New Service Request
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 cursor-pointer">
                    <CheckSquare className="h-4 w-4 text-slate-500" />
                    New Task
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
