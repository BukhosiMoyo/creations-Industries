
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, GripVertical, Save } from "lucide-react";

interface Step {
    id?: string;
    subject: string;
    body: string;
    delayMinutes: number;
    order: number;
}

interface StepsEditorProps {
    campaignId: string;
    initialSteps: Step[];
}

export function CampaignStepsEditor({ campaignId, initialSteps }: StepsEditorProps) {
    const router = useRouter();
    const [steps, setSteps] = useState<Step[]>(initialSteps.sort((a, b) => a.order - b.order));
    const [loading, setLoading] = useState(false);

    const addStep = () => {
        setSteps([
            ...steps,
            {
                subject: "",
                body: "",
                delayMinutes: 1440, // 1 day default 
                order: steps.length + 1
            }
        ]);
    };

    const removeStep = (index: number) => {
        const newSteps = steps.filter((_, i) => i !== index).map((s, i) => ({ ...s, order: i + 1 }));
        setSteps(newSteps);
    };

    const updateStep = (index: number, field: keyof Step, value: unknown) => {
        const newSteps = [...steps];
        newSteps[index] = { ...newSteps[index], [field]: value };
        setSteps(newSteps);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Full replace or smart update? 
            // API route logic: Delete all steps for campaign and recreate? Or upsert?
            // Easiest for MVP: POST to /api/campaigns/[id]/steps to replace all.
            const res = await fetch(`/api/campaigns/${campaignId}/steps`, {
                method: 'PUT',
                body: JSON.stringify({ steps }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) throw new Error("Failed to save steps");

            router.refresh();
            alert("Steps saved successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to save steps");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {steps.map((step, index) => (
                <Card key={index} className="relative">
                    <CardHeader className="pb-2 flex flex-row items-center gap-4">
                        <div className="bg-muted w-8 h-8 rounded-full flex items-center justify-center font-bold text-muted-foreground">
                            {index + 1}
                        </div>
                        <div className="flex-1">
                            <Input
                                value={step.subject}
                                onChange={e => updateStep(index, 'subject', e.target.value)}
                                placeholder={`Step ${index + 1} Subject`}
                                className="font-semibold text-lg border-none hover:bg-muted/50 focus:bg-background px-2"
                            />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeStep(index)} className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Email Body</Label>
                            <Textarea
                                value={step.body}
                                onChange={e => updateStep(index, 'body', e.target.value)}
                                placeholder="Hi {{firstName}}, ..."
                                className="min-h-[150px] font-mono text-sm"
                            />
                            <p className="text-xs text-muted-foreground">Available variables: {'{{firstName}}'}, {'{{companyName}}'}, {'{{jobTitle}}'}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <Label className="whitespace-nowrap">Wait Time (Minutes):</Label>
                                <Input
                                    type="number"
                                    value={step.delayMinutes}
                                    onChange={e => updateStep(index, 'delayMinutes', parseInt(e.target.value))}
                                    className="w-24"
                                />
                                <span className="text-xs text-muted-foreground">
                                    (~{(step.delayMinutes / 60).toFixed(1)} hours)
                                </span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}

            <div className="flex justify-between items-center pt-4">
                <Button variant="outline" onClick={addStep} className="gap-2">
                    <Plus className="h-4 w-4" /> Add Step
                </Button>
                <Button onClick={handleSave} disabled={loading} className="gap-2 min-w-[150px]">
                    <Save className="h-4 w-4" />
                    {loading ? "Saving..." : "Save Sequence"}
                </Button>
            </div>
        </div>
    );
}
