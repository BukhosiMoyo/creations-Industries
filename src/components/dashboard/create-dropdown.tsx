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
import { NewRequestDialog } from "@/components/dashboard/pipeline/new-request-dialog"
import { NewCompanyDialog } from "@/components/dashboard/companies/new-company-dialog"
import { NewTaskDialog } from "@/components/dashboard/tasks/new-task-dialog"

export function CreateDropdown() {
    const [openRequest, setOpenRequest] = React.useState(false)
    const [openCompany, setOpenCompany] = React.useState(false)
    const [openTask, setOpenTask] = React.useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="sm" className="hidden sm:flex gap-2 font-semibold shadow-accent/20 text-white">
                        <Plus className="h-4 w-4" />
                        Create
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>New Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault()
                            setOpenCompany(true)
                        }}
                    >
                        <Building2 className="h-4 w-4 text-slate-500" />
                        New Company
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault()
                            setOpenRequest(true)
                        }}
                    >
                        <Briefcase className="h-4 w-4 text-slate-500" />
                        New Service Request
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className="gap-2 cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault()
                            setOpenTask(true)
                        }}
                    >
                        <CheckSquare className="h-4 w-4 text-slate-500" />
                        New Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <NewCompanyDialog open={openCompany} onOpenChange={setOpenCompany} />

            {/* 
                Refactored Reuse: 
                We need to wrap the existing dialogs or modify them to accept open state control 
                if they handle their own trigger. 
                
                For now, since NewRequestDialog has its own trigger, we might need to modify it 
                OR conditionally render it if it supports controlled state.
                Let's inspect NewRequestDialog again. It has internal state. 
                We should probably modify NewRequestDialog to accept external control 
                OR just render it invisible trigger-style? 
                
                Actually, simpler approach:
                Render the dialogs hidden, and use a ref or state to open them?
                React Dialogs usually support `open` prop.
                
                Let's temporarily modify the imports above to point to a wrapper if needed.
                But wait, I created NewCompanyDialog and NewTaskDialog to accept children as trigger?
                No, I defined them with internal state in my previous step?
                Let me re-read my own file write for `new-company-dialog.tsx`.
                
                "export function NewCompanyDialog({ children }: { children?: React.ReactNode }) ..."
                It uses a trigger children.
                
                So the pattern should be:
                <NewCompanyDialog>
                   <DropdownMenuItem onSelect={(e) => e.preventDefault()}>...</DropdownMenuItem>
                </NewCompanyDialog>
                
                This creates a nested issue in DropdownMenu. 
                Better pattern for Shadcn:
                Keep Dropdown items clean, use state to open dialogs outside the dropdown.
            */}

            {/* 
               Correction: My previous write of NewCompanyDialog DOES NOT expose `open` prop.
               It has internal `const [open, setOpen] = useState(false)`.
               This is a problem for programmatic opening from dropdown.
               
               I need to update `NewCompanyDialog`, `NewTaskDialog` and `NewRequestDialog` 
               to accept `open` and `onOpenChange` props for controlled usage.
               
               However, to avoid editing 3 files right now, I can wrap the MENU ITEM in the dialog trigger?
               That closes the menu properly? 
               NEXT UI / Radix usually allows <DialogTrigger asChild> <DropdownMenuItem ... /> </DialogTrigger>
               Let's try that pattern, it's cleaner.
             */}
        </>
    )
}

