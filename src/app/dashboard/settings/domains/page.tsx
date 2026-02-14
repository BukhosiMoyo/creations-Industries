
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, CheckCircle, AlertCircle, Clock } from "lucide-react";

type Domain = {
    id: string;
    domain: string;
    dkimStatus: string;
    spfStatus: string;
    dmarcStatus: string;
    isActive: boolean;
};

export default function DomainsPage() {
    const [domains, setDomains] = useState<Domain[]>([]);
    const [newDomain, setNewDomain] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDomains();
    }, []);

    const fetchDomains = async () => {
        try {
            const res = await fetch('/api/settings/domains');
            if (res.ok) {
                const data = await res.json();
                setDomains(data);
            }
        } catch (error) {
            console.error("Failed to fetch domains");
        }
    };

    const handleAdd = async () => {
        if (!newDomain) return;
        setLoading(true);
        try {
            const res = await fetch('/api/settings/domains', {
                method: 'POST',
                body: JSON.stringify({ domain: newDomain }),
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setNewDomain("");
                fetchDomains();
            } else {
                alert("Failed to add domain");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Verified': return <CheckCircle className="h-4 w-4 text-emerald-500" />;
            case 'Failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
            default: return <Clock className="h-4 w-4 text-amber-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Sending Domains</h2>
                <p className="text-muted-foreground">Manage verified domains for email sending.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Add New Domain</CardTitle>
                    <CardDescription>Enter the domain you want to send emails from (e.g., example.com)</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Input
                        placeholder="yourdomain.com"
                        value={newDomain}
                        onChange={e => setNewDomain(e.target.value)}
                        className="max-w-md"
                    />
                    <Button onClick={handleAdd} disabled={loading}>
                        {loading ? <Clock className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                        Add Domain
                    </Button>
                </CardContent>
            </Card>

            <div className="grid gap-4">
                {domains.map(domain => (
                    <Card key={domain.id} className="items-center">
                        <CardContent className="flex items-center justify-between p-6">
                            <div className="space-y-1">
                                <h3 className="font-bold">{domain.domain}</h3>
                                <div className="flex gap-2">
                                    <Badge variant="outline" className="gap-1">
                                        {getStatusIcon(domain.spfStatus)} SPF: {domain.spfStatus}
                                    </Badge>
                                    <Badge variant="outline" className="gap-1">
                                        {getStatusIcon(domain.dkimStatus)} DKIM: {domain.dkimStatus}
                                    </Badge>
                                </div>
                            </div>
                            <div>
                                {domain.dkimStatus === 'Verified' && domain.spfStatus === 'Verified' ? (
                                    <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>
                                ) : (
                                    <Button variant="outline" size="sm">Verify DNS</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {domains.length === 0 && (
                    <div className="text-center p-8 text-muted-foreground text-sm border rounded-xl border-dashed">
                        No domains added yet.
                    </div>
                )}
            </div>
        </div>
    );
}
