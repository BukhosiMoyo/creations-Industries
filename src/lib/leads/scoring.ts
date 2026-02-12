import { LeadUrgency, LeadBudgetRange, ServiceType, Priority } from "@prisma/client";

interface ScoreParams {
    urgency: LeadUrgency;
    budgetRange: LeadBudgetRange;
    serviceType: ServiceType;
    hasDocuments: boolean;
    hasCompanyName: boolean;
    messageLength: number;
}

export function calculateLeadScore(params: ScoreParams): number {
    let score = 0;

    // 1. Urgency
    switch (params.urgency) {
        case LeadUrgency.Urgent_24_48h: score += 40; break;
        case LeadUrgency.Soon_7d: score += 25; break;
        case LeadUrgency.Flexible_30d: score += 10; break;
    }

    // 2. Budget
    switch (params.budgetRange) {
        case LeadBudgetRange.R30kPlus: score += 30; break;
        case LeadBudgetRange.R15k_30k: score += 20; break;
        case LeadBudgetRange.R5k_15k: score += 10; break;
        case LeadBudgetRange.Unknown: score += 5; break;
        case LeadBudgetRange.Under5k: score += 2; break;
    }

    // 3. Service Complexity/Value
    const highValueServices: ServiceType[] = ["Tax", "Payroll", "TenderReadiness"];
    const mediumValueServices: ServiceType[] = ["Bookkeeping"];
    const nicheServices: ServiceType[] = ["CIPC"];

    if (highValueServices.includes(params.serviceType)) score += 15;
    else if (mediumValueServices.includes(params.serviceType)) score += 10;
    else if (nicheServices.includes(params.serviceType)) score += 8;
    else score += 5;

    // 4. Extras
    if (params.hasDocuments) score += 10;
    if (params.hasCompanyName) score += 5;
    if (params.messageLength > 50) score += 3;

    // Cap at 100
    return Math.min(score, 100);
}

export function getPriorityFromScore(score: number): Priority {
    if (score >= 75) return "High";
    if (score >= 45) return "Med";
    return "Low";
}
