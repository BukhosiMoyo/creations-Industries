
"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCampaign(id: string) {
    revalidatePath(`/dashboard/campaigns/${id}`);
}
