import * as React from 'react';

interface ClientConfirmationEmailProps {
    referenceId: string;
    name: string;
}

export const ClientConfirmationEmail: React.FC<ClientConfirmationEmailProps> = ({
    referenceId,
    name,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
        <h1 style={{ color: '#000', fontSize: '24px', marginBottom: '20px' }}>Thank you for reaching out</h1>

        <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
            Hi {name},
        </p>

        <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
            We have received your enquiry and a member of our team
            will be in touch within one business day.
        </p>

        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '5px', margin: '30px 0', textAlign: 'center' }}>
            <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>Your Reference ID</p>
            <p style={{ margin: '10px 0 0 0', fontSize: '24px', fontWeight: 'bold', color: '#000', letterSpacing: '1px' }}>{referenceId}</p>
        </div>

        <p style={{ lineHeight: '1.6', fontSize: '16px' }}>
            If you need to reach us before then, you can reply directly to this email or contact us at <a href="mailto:info@creations.africa" style={{ color: '#000', textDecoration: 'underline' }}>info@creations.africa</a>.
        </p>

        <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '10px' }}>What happens next?</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '10px' }}>We review your submission details.</li>
                <li style={{ marginBottom: '10px' }}>We check for any immediate compliance concerns.</li>
                <li style={{ marginBottom: '10px' }}>We contact you to discuss the next steps or schedule a call.</li>
            </ol>
        </div>

        <div style={{ marginTop: '60px', fontSize: '14px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p style={{ fontWeight: 'bold' }}>Creations</p>
            <p>100 West Street, Sandton<br />Johannesburg, 2196</p>
            <p>This is an automated confirmation. Please do not reply to this email directly.</p>
        </div>
    </div>
);

export default ClientConfirmationEmail;
