import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface InvoiceIssuedProps {
    clientName?: string;
    invoiceNumber?: string;
    amount?: string;
    dueDate?: string;
    link?: string;
}

export const InvoiceIssued = ({
    clientName = "{{clientName}}",
    invoiceNumber = "{{invoiceNumber}}",
    amount = "{{amount}}",
    dueDate = "{{dueDate}}",
    link = "{{link}}",
}: InvoiceIssuedProps) => {
    return (
        <EmailLayout preview={`Invoice ${invoiceNumber} is now available`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Invoice Issued
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Hello {clientName},
                <br /><br />
                A new invoice <strong>{invoiceNumber}</strong> for <strong>{amount}</strong> has been issued to your account.
                <br />
                Due Date: {dueDate}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={link}
                >
                    View & Pay Invoice
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default InvoiceIssued;
