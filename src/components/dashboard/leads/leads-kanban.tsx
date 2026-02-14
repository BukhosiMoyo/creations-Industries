"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
    DragOverEvent,
    useDroppable,
    useDraggable
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KanbanColumn } from "@/components/dashboard/pipeline/kanban-column"; // Reusing or creating new? 
// The existing dashboard/pipeline/kanban-column seems tied to ServiceRequests? 
// Let's create specific components here to avoid confusion or refactor later.
// For now, I'll build a self-contained Kanban here using the same UI primitives.

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";


// Types
type PipelineStage = {
    id: string;
    name: string;
    color: string;
};

type Lead = {
    id: string;
    firstName: string;
    lastName: string;
    companyName: string | null;
    email: string;
    leadScore: number;
    pipelineStageId: string | null;
    pipelineStage?: PipelineStage;
};

interface LeadsKanbanProps {
    leads: Lead[];
    stages: PipelineStage[];
}

export function LeadsKanban({ leads: initialLeads, stages }: LeadsKanbanProps) {
    const router = useRouter();
    const [leads, setLeads] = useState<Lead[]>(initialLeads);
    // Group leads by stage
    // We need a map of stageId -> Lead[]

    // Optimistic Update helper
    const updateLeadStage = async (leadId: string, newStageId: string) => {
        // optimistically update state
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, pipelineStageId: newStageId } : l));

        try {
            const res = await fetch(`/api/leads/${leadId}`, {
                method: 'PATCH',
                body: JSON.stringify({ pipelineStageId: newStageId }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!res.ok) throw new Error("Failed to update");
            router.refresh();
        } catch (error) {
            console.error(error);
            // revert?
            alert("Failed to move lead");
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const [activeId, setActiveId] = useState<string | null>(null);

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string);
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const leadId = active.id as string;

        setActiveId(null);

        if (!over) return;

        // If dropped on a container (Column)
        const overId = over.id as string;

        // Find if overId is a stage ID
        const isStage = stages.find(s => s.id === overId);

        if (isStage) {
            const lead = leads.find(l => l.id === leadId);
            if (lead && lead.pipelineStageId !== isStage.id) {
                updateLeadStage(leadId, isStage.id);
            }
        }
    }

    // Allow dropping on cards too? Dnd-kit is tricky with mixed droppables.
    // Simplifying: Columns are droppable zones.
    // Cards are draggable.

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex h-[calc(100vh-14rem)] gap-4 overflow-x-auto pb-4">
                {stages.map(stage => {
                    const stageLeads = leads.filter(l => l.pipelineStageId === stage.id);
                    // Handle "null" stage? (Unassigned)
                    // If we have leads with null stage, put them in first column or a "New" column?
                    // Assuming for now data is clean or we map null to first stage.

                    return (
                        <LeadColumn
                            key={stage.id}
                            stage={stage}
                            leads={stageLeads}
                        />
                    );
                })}
            </div>
            <DragOverlay>
                {activeId ? (
                    <LeadCard lead={leads.find(l => l.id === activeId)!} overlay />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}

function LeadColumn({ stage, leads }: { stage: PipelineStage, leads: Lead[] }) {
    const { setNodeRef } = useDroppable({
        id: stage.id,
    });

    return (
        <div ref={setNodeRef} className="flex h-full w-80 min-w-[20rem] flex-col rounded-xl border bg-muted/20">
            <div className="flex items-center justify-between p-4 border-b bg-card/50 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color || '#ccc' }} />
                    <h3 className="font-semibold text-sm">{stage.name}</h3>
                    <Badge variant="secondary" className="ml-2 text-xs">{leads.length}</Badge>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {leads.map(lead => (
                    <DraggableLeadCard key={lead.id} lead={lead} />
                ))}
            </div>
        </div>
    );
}


function DraggableLeadCard({ lead }: { lead: Lead }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id: lead.id,
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className={cn("touch-none", isDragging && "opacity-50")}>
            <LeadCard lead={lead} />
        </div>
    );
}

function LeadCard({ lead, overlay }: { lead: Lead, overlay?: boolean }) {
    return (
        <Card className={cn("cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors shadow-sm", overlay && "shadow-xl border-accent rotate-2")}>
            <CardContent className="p-3 space-y-2">
                <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm line-clamp-1">{lead.companyName || "Unknown Company"}</span>
                    <Button variant="ghost" className="h-6 w-6 p-0 -mr-2 -mt-1"><MoreHorizontal className="h-3 w-3" /></Button>
                </div>
                <div className="text-xs text-muted-foreground">
                    {lead.firstName} {lead.lastName}
                </div>
                <div className="flex items-center justify-between pt-2">
                    <Badge variant="outline" className={cn(
                        "text-[10px] h-5 font-bold border-0",
                        lead.leadScore > 50 ? "bg-emerald-500/10 text-emerald-600" : "bg-slate-500/10 text-slate-600"
                    )}>
                        Score: {lead.leadScore}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
}
