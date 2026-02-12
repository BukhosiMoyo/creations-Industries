import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface ReminderMissingDocsClientProps {
    portalUrl?: string;
}

export const ReminderMissingDocsClient = ({
    portalUrl = "{{portalUrl}}",
}: ReminderMissingDocsClientProps) => {
    return (
        <EmailLayout preview="We’re waiting on a few items.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Reminder: documents outstanding
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We’re still waiting on documents to proceed.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    Upload now
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default ReminderMissingDocsClient;
