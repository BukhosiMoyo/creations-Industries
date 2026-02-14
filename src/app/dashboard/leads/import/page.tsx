import { LeadImportForm } from "@/components/dashboard/leads/lead-import-form";

export default function ImportLeadsPage() {
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">Import Leads</h2>
            </div>
            <div className="flex justify-center mt-10">
                <LeadImportForm />
            </div>
        </div>
    );
}
