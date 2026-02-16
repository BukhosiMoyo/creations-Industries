import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface AuthFinishSetupProps {
    firstName?: string;
    setupUrl?: string;
    serviceType?: string;
    brandName?: string;
}

export const AuthFinishSetup = ({
    firstName = "{{firstName}}",
    setupUrl = "{{setupUrl}}",
    serviceType = "{{serviceType}}",
    brandName = "{{brandName}}",
}: AuthFinishSetupProps) => {
    return (
        <EmailLayout preview="Finish setting up your account to track your request.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Finish Account Setup
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Hi {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                We noticed you haven't finished setting up your account for your <strong>{serviceType}</strong> request yet.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                Completing setup takes less than a minute and gives you secure access to track status and manage documents.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={setupUrl}
                >
                    Complete Account Setup
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default AuthFinishSetup;
