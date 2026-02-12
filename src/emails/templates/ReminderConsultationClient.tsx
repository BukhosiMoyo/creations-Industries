import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface ReminderConsultationClientProps {
    date?: string;
    time?: string;
    portalUrl?: string;
}

export const ReminderConsultationClient = ({
    date = "{{date}}",
    time = "{{time}}",
    portalUrl = "{{portalUrl}}",
}: ReminderConsultationClientProps) => {
    return (
        <EmailLayout preview="Upcoming consultation reminder.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Consultation Reminder
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                You have an upcoming consultation.
                <br />
                Date: {date}
                <br />
                Time: {time}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View details
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default ReminderConsultationClient;
