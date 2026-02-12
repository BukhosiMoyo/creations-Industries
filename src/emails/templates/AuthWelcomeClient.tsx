import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface AuthWelcomeClientProps {
    firstName?: string;
    dashboardUrl?: string;
    supportEmail?: string;
    brandName?: string;
}

export const AuthWelcomeClient = ({
    firstName = "{{firstName}}",
    dashboardUrl = "{{dashboardUrl}}",
    supportEmail = "{{supportEmail}}",
    brandName = "{{brandName}}",
}: AuthWelcomeClientProps) => {
    return (
        <EmailLayout preview={`Welcome to ${brandName} — your account is ready`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Welcome to {brandName}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Hi {firstName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                Welcome to {brandName}. Your account has been successfully created.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                From your dashboard you can:
                <br />
                • Track service requests
                <br />
                • Upload documents securely
                <br />
                • Receive updates
                <br />
                • Communicate with our team
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    Access your dashboard
                </Button>
            </Section>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
                If you did not request this account, contact {supportEmail}.
            </Text>
        </EmailLayout>
    );
};

export default AuthWelcomeClient;
