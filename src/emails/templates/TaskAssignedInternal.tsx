import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface TaskAssignedInternalProps {
    taskTitle?: string;
    dueDate?: string;
    dashboardUrl?: string;
}

export const TaskAssignedInternal = ({
    taskTitle = "{{taskTitle}}",
    dueDate = "{{dueDate}}",
    dashboardUrl = "{{dashboardUrl}}",
}: TaskAssignedInternalProps) => {
    return (
        <EmailLayout preview="New task assigned.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                New Task Assigned
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Task: <strong>{taskTitle}</strong>
                <br />
                Due: {dueDate}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    View task
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default TaskAssignedInternal;
