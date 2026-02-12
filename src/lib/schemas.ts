import * as z from "zod"

export const contactSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

export type ContactFormValues = z.infer<typeof contactSchema>

export const quoteSchema = z.object({
    firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
    lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid phone number." }),
    companyName: z.string().min(2, { message: "Company name is required." }),
    industry: z.string().min(1, { message: "Please select an industry." }),
    services: z.array(z.string()).refine((value) => value.length > 0, {
        message: "Please select at least one service.",
    }),
    message: z.string().optional(),
})

export type QuoteFormValues = z.infer<typeof quoteSchema>
