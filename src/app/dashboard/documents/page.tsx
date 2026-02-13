"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Plus,
    Search,
    FileText,
    Filter,
    Download,
    Clock,
    MoreHorizontal,
    Upload,
    File,
    FileImage,
    FileSpreadsheet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Document {
    id: string;
    filename: string;
    type: string;
    mimeType: string | null;
    size: number | null;
    accessLevel: string;
    uploadedAt: string;
    company: { legalName: string };
    uploadedBy: { name: string | null };
    serviceRequest: { serviceType: string } | null;
}

const DOC_TYPE_LABELS: Record<string, string> = {
    ID: "ID Document",
    BankStatement: "Bank Statement",
    Invoice: "Invoice",
    CIPC: "CIPC",
    SARS: "SARS",
    TenderDoc: "Tender Doc",
    Other: "Other",
};

const DOC_TYPE_STYLES: Record<string, string> = {
    ID: "bg-blue-500/10 text-blue-600",
    BankStatement: "bg-emerald-500/10 text-emerald-600",
    Invoice: "bg-amber-500/10 text-amber-600",
    CIPC: "bg-purple-500/10 text-purple-600",
    SARS: "bg-red-500/10 text-red-500",
    TenderDoc: "bg-indigo-500/10 text-indigo-600",
    Other: "bg-muted text-muted-foreground",
};

function formatFileSize(bytes: number | null): string {
    if (!bytes) return "—";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(mimeType: string | null) {
    if (!mimeType) return File;
    if (mimeType.startsWith("image/")) return FileImage;
    if (
        mimeType.includes("spreadsheet") ||
        mimeType.includes("csv") ||
        mimeType.includes("excel")
    )
        return FileSpreadsheet;
    return FileText;
}

export default function DocumentsPage() {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const res = await fetch("/api/documents");
                if (res.ok) {
                    const data = await res.json();
                    setDocuments(data);
                }
            } catch (err) {
                console.error("Failed to fetch documents:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDocuments();
    }, []);

    const filteredDocuments = documents.filter(
        (d) =>
            d.filename.toLowerCase().includes(search.toLowerCase()) ||
            d.company.legalName.toLowerCase().includes(search.toLowerCase()) ||
            d.type.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Documents
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        All client documents and files.{" "}
                        <span className="text-foreground font-bold">
                            {documents.length}
                        </span>{" "}
                        total files.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl border-border/60 gap-2 font-semibold"
                    >
                        <Download className="h-4 w-4" />
                        Export
                    </Button>
                    <Button className="rounded-xl font-bold bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Document
                    </Button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 transition-colors group-focus-within:text-accent" />
                    <Input
                        placeholder="Search by filename, client, or document type..."
                        className="pl-10 h-11 bg-card border-border/60 rounded-xl focus:ring-accent/20 focus:border-accent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Button
                    variant="outline"
                    className="h-11 rounded-xl border-border/60 gap-2 px-4 text-muted-foreground font-medium"
                >
                    <Filter className="h-4 w-4" />
                    Filters
                </Button>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-1">
                {loading ? (
                    <div className="py-24 flex flex-col items-center justify-center space-y-4">
                        <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
                        <p className="text-muted-foreground font-semibold uppercase tracking-widest text-[10px]">
                            Loading Documents...
                        </p>
                    </div>
                ) : filteredDocuments.length === 0 ? (
                    <Card className="border-dashed border-2 py-24 bg-transparent border-border/60">
                        <CardContent className="flex flex-col items-center justify-center text-center">
                            <div className="h-16 w-16 rounded-3xl bg-muted/30 flex items-center justify-center text-muted-foreground/40 mb-6">
                                <FileText className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                No documents found
                            </h3>
                            <p className="text-muted-foreground max-w-sm font-medium">
                                {search
                                    ? `No results for "${search}".`
                                    : "No documents have been uploaded yet."}
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        {/* Column Headers */}
                        <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">
                            <div className="col-span-4">File</div>
                            <div className="col-span-2">Client</div>
                            <div className="col-span-1 text-center">Type</div>
                            <div className="col-span-1 text-center">Size</div>
                            <div className="col-span-1 text-center">
                                Access
                            </div>
                            <div className="col-span-1 text-center">
                                Uploaded
                            </div>
                            <div className="col-span-2 text-right">Actions</div>
                        </div>
                        <div className="space-y-3">
                            {filteredDocuments.map((doc) => {
                                const FileIcon = getFileIcon(doc.mimeType);

                                return (
                                    <Card
                                        key={doc.id}
                                        className="border-border/60 bg-card hover:bg-muted/30 transition-all group shadow-sm hover:shadow-md cursor-default"
                                    >
                                        <CardContent className="p-0">
                                            <div className="lg:grid lg:grid-cols-12 flex items-center justify-between p-4 gap-4">
                                                {/* Filename */}
                                                <div className="lg:col-span-4 flex items-center gap-4">
                                                    <div className="h-12 w-12 shrink-0 rounded-2xl bg-muted/50 border border-border/50 flex items-center justify-center text-muted-foreground group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-300">
                                                        <FileIcon className="h-6 w-6" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="font-bold text-foreground text-sm truncate">
                                                            {doc.filename}
                                                        </h3>
                                                        <span className="text-xs font-semibold text-muted-foreground/70 truncate block">
                                                            {doc.uploadedBy
                                                                ?.name ||
                                                                "Unknown"}{" "}
                                                            •{" "}
                                                            {doc.serviceRequest
                                                                ?.serviceType ||
                                                                "General"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Client */}
                                                <div className="hidden lg:col-span-2 lg:flex items-center min-w-0">
                                                    <span className="text-xs font-bold text-foreground/80 truncate">
                                                        {doc.company.legalName}
                                                    </span>
                                                </div>

                                                {/* Type */}
                                                <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                    <Badge
                                                        variant="outline"
                                                        className={`${DOC_TYPE_STYLES[
                                                            doc.type
                                                            ] || ""
                                                            } border-none text-[10px] font-bold uppercase tracking-wider`}
                                                    >
                                                        {DOC_TYPE_LABELS[
                                                            doc.type
                                                        ] || doc.type}
                                                    </Badge>
                                                </div>

                                                {/* Size */}
                                                <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                    <span className="text-xs font-bold text-foreground/70 font-mono">
                                                        {formatFileSize(
                                                            doc.size
                                                        )}
                                                    </span>
                                                </div>

                                                {/* Access */}
                                                <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                    <Badge
                                                        variant="outline"
                                                        className={`text-[10px] font-bold border-none ${doc.accessLevel ===
                                                                "ClientVisible"
                                                                ? "bg-emerald-500/10 text-emerald-600"
                                                                : "bg-muted text-muted-foreground"
                                                            }`}
                                                    >
                                                        {doc.accessLevel ===
                                                            "ClientVisible"
                                                            ? "Shared"
                                                            : "Internal"}
                                                    </Badge>
                                                </div>

                                                {/* Uploaded */}
                                                <div className="hidden lg:col-span-1 lg:flex items-center justify-center">
                                                    <div className="flex items-center gap-1 text-xs font-bold text-foreground/70">
                                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                                        {new Date(
                                                            doc.uploadedAt
                                                        ).toLocaleDateString(
                                                            [],
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="lg:col-span-2 flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        className="h-9 px-3 rounded-lg gap-2 font-bold text-xs hover:bg-accent/10 hover:text-accent transition-colors"
                                                    >
                                                        <Download className="h-3.5 w-3.5" />
                                                        Download
                                                    </Button>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-9 w-9 text-muted-foreground hover:bg-muted rounded-lg"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            align="end"
                                                            className="rounded-xl border-border shadow-2xl"
                                                        >
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                View Details
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                Share with
                                                                Client
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5">
                                                                Rename
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-semibold text-xs py-2.5 text-red-500">
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
