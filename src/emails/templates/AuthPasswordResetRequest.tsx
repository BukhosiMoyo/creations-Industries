import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface AuthPasswordResetRequestProps {
    resetUrl?: string;
    brandName?: string;
}

export const AuthPasswordResetRequest = ({
    resetUrl = "{{resetUrl}}",
    brandName = "{{brandName}}",
}: AuthPasswordResetRequestProps) => {
    return (
        <EmailLayout preview="A password reset was requested.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Reset your {brandName} password
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We received a request to reset your password.
                <br />
                If this wasn’t you, ignore this email.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={resetUrl}
                >
                    Reset password
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default AuthPasswordResetRequest;
