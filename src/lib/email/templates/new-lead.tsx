import * as React from 'react';

interface NewLeadEmailProps {
    referenceId: string;
    name: string;
    email: string;
    phone?: string;
    companyName: string;
    companyType?: string;
    industry?: string;
    services: string[];
    description?: string;
    source: string;
    date: string;
}

export const NewLeadEmail: React.FC<NewLeadEmailProps> = ({
    referenceId,
    name,
    email,
    phone,
    companyName,
    companyType,
    industry,
    services,
    description,
    source,
    date,
}) => (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
        <h1 style={{ color: '#000', fontSize: '24px' }}>New Lead Received</h1>

        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
            <p style={{ margin: '5px 0' }}><strong>Reference:</strong> {referenceId}</p>
            <p style={{ margin: '5px 0' }}><strong>Source:</strong> {source}</p>
            <p style={{ margin: '5px 0' }}><strong>Date:</strong> {date}</p>
        </div>

        <h2 style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Contact Details</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '10px' }}><strong>Name:</strong> {name}</li>
            <li style={{ marginBottom: '10px' }}><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></li>
            <li style={{ marginBottom: '10px' }}><strong>Phone:</strong> {phone || 'Not provided'}</li>
            <li style={{ marginBottom: '10px' }}><strong>Company:</strong> {companyName}</li>
            {companyType && <li style={{ marginBottom: '10px' }}><strong>Type:</strong> {companyType}</li>}
            {industry && <li style={{ marginBottom: '10px' }}><strong>Industry:</strong> {industry}</li>}
        </ul>

        <h2 style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px' }}>Services Requested</h2>
        {services.length > 0 ? (
            <ul>
                {services.map((service, index) => (
                    <li key={index} style={{ marginBottom: '5px' }}>{service}</li>
                ))}
            </ul>
        ) : (
            <p>No specific services selected.</p>
        )}

        {description && (
            <>
                <h2 style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px' }}>Description / Notes</h2>
                <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', whiteSpace: 'pre-wrap' }}>
                    {description}
                </div>
            </>
        )}

        <div style={{ marginTop: '40px', fontSize: '12px', color: '#666', borderTop: '1px solid #eee', paddingTop: '20px' }}>
            <p>This lead was submitted securely via creations.co.za.</p>
        </div>
    </div>
);

export default NewLeadEmail;
