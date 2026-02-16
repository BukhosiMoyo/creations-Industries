import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface LeadTrackRequestProps {
    serviceType?: string;
    leadId?: string;
    urgency?: string;
    trackUrl?: string;
    brandName?: string;
}

export const LeadTrackRequest = ({
    serviceType = "{{serviceType}}",
    leadId = "{{leadId}}",
    urgency = "{{urgency}}",
    trackUrl = "{{trackUrl}}",
    brandName = "{{brandName}}",
}: LeadTrackRequestProps) => {
    return (
        <EmailLayout preview="Track the status of your request.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Request Received
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We have received your request for <strong>{serviceType}</strong> and our team is reviewing it.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                <strong>Details:</strong><br />
                Reference: {leadId}<br />
                Urgency: {urgency}
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={trackUrl}
                >
                    Create Account to Track Progress
                </Button>
            </Section>

            <Text className="text-black text-[14px] leading-[24px]">
                Creating an account allows you to safely upload documents, communicate with our team, and see real-time updates.
            </Text>
        </EmailLayout>
    );
};

export default LeadTrackRequest;
