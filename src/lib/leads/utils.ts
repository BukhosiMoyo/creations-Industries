import { customAlphabet } from 'nanoid';

// Create a custom alphabet for ID generation (uppercase + numbers, no ambiguous chars like I/1, O/0)
const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const nanoid = customAlphabet(alphabet, 4);

/**
 * Generates a human-readable reference ID for leads.
 * Format: CRE-YYYYMMDD-XXXX
 * Example: CRE-20240214-A7K2
 */
export function generateReferenceId(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const dateString = `${year}${month}${day}`;
    const randomSuffix = nanoid();

    return `CRE-${dateString}-${randomSuffix}`;
}
