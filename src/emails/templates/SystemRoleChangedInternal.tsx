import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface SystemRoleChangedInternalProps {
    newRole?: string;
    dashboardUrl?: string;
}

export const SystemRoleChangedInternal = ({
    newRole = "{{newRole}}",
    dashboardUrl = "{{dashboardUrl}}",
}: SystemRoleChangedInternalProps) => {
    return (
        <EmailLayout preview="Your role permissions have been updated.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Role Updated
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your user role has been updated to: <strong>{newRole}</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    Access dashboard
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default SystemRoleChangedInternal;
