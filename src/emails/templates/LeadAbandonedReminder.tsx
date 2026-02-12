import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface LeadAbandonedReminderProps {
    serviceType?: string;
    portalUrl?: string;
}

export const LeadAbandonedReminder = ({
    serviceType = "{{serviceType}}",
    portalUrl = "{{portalUrl}}",
}: LeadAbandonedReminderProps) => {
    return (
        <EmailLayout preview="Your request is still open.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                You’re almost done — complete your request
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                You started a request for <strong>{serviceType}</strong> but didn’t complete it.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    Continue your request
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default LeadAbandonedReminder;
