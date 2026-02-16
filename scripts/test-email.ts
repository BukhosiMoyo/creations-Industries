
import { Resend } from 'resend';
import * as dotenv from 'dotenv';
import * as React from 'react';
import { render } from '@react-email/render';
import { AuthVerifyEmail } from '../src/emails/templates/AuthVerifyEmail';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTestEmail() {
    if (!process.env.RESEND_API_KEY) {
        console.error("Missing RESEND_API_KEY");
        return;
    }

    try {
        const emailHtml = await render(React.createElement(AuthVerifyEmail, {
            verifyUrl: "https://creations.africa/verify-test"
        }));

        const data = await resend.emails.send({
            from: 'Creations <notifications@creations.africa>',
            to: ['khosicodes@gmail.com'],
            subject: 'Creations Template Test: Verify Email',
            html: emailHtml
        });

        console.log("Email sent successfully:", data);
    } catch (error) {
        console.error("Failed to send email:", error);
    }
}

sendTestEmail();
