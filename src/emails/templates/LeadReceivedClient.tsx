import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface LeadReceivedClientProps {
    serviceType?: string;
    leadId?: string;
    urgency?: string;
    portalUrl?: string;
    brandName?: string;
}

export const LeadReceivedClient = ({
    serviceType = "{{serviceType}}",
    leadId = "{{leadId}}",
    urgency = "{{urgency}}",
    portalUrl = "{{portalUrl}}",
    brandName = "{{brandName}}",
}: LeadReceivedClientProps) => {
    return (
        <EmailLayout preview="Here’s what happens next.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                We’ve received your request
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Thanks for contacting {brandName} regarding <strong>{serviceType}</strong>.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                Reference: {leadId}
                <br />
                Urgency: {urgency}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View request status
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default LeadReceivedClient;
