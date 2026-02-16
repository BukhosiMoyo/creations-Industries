
import { Resend } from 'resend';
import * as dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: 'Creations <notifications@creations.africa>',
            to: ['khosicodes@gmail.com'],
            subject: 'Test Email from Creations',
            html: '<p>This is a test email to verify the Resend integration.</p>'
        });

        console.log("Email sent successfully:", data);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

sendTestEmail();
