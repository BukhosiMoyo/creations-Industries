interface KanbanBoardProps {
    children: React.ReactNode
}

export function KanbanBoard({ children }: KanbanBoardProps) {
    return (
        <div className="flex-1 overflow-x-auto overflow-y-hidden -mx-4 px-4 pb-6 scrollbar-thin scrollbar-thumb-border hover:scrollbar-thumb-accent/20">
            <div className="flex gap-6 min-w-max h-full pb-4">
                {children}
            </div>
        </div>
    )
}
