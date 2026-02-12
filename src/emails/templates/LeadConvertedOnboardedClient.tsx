import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface LeadConvertedOnboardedClientProps {
    dashboardUrl?: string;
}

export const LeadConvertedOnboardedClient = ({
    dashboardUrl = "{{dashboardUrl}}",
}: LeadConvertedOnboardedClientProps) => {
    return (
        <EmailLayout preview="Your service is now active.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                You’re officially onboarded
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your request has been converted into an active service.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    Go to dashboard
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default LeadConvertedOnboardedClient;
