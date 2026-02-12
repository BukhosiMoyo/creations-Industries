import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface DigestDailyInternalProps {
    brandName?: string;
    dashboardUrl?: string;
}

export const DigestDailyInternal = ({
    brandName = "{{brandName}}",
    dashboardUrl = "{{dashboardUrl}}",
}: DigestDailyInternalProps) => {
    return (
        <EmailLayout preview={`Daily summary — ${brandName}`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Daily summary — {brandName}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                • New leads
                <br />
                • Overdue tasks
                <br />
                • Pending documents
                <br />
                • High-priority requests
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    Open dashboard
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default DigestDailyInternal;
