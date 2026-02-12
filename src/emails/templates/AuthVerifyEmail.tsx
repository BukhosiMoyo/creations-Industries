import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface AuthVerifyEmailProps {
    verifyUrl?: string;
}

export const AuthVerifyEmail = ({
    verifyUrl = "{{verifyUrl}}",
}: AuthVerifyEmailProps) => {
    return (
        <EmailLayout preview="Confirm your email to activate your account.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Please verify your email address
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Please verify your email address to complete your setup.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={verifyUrl}
                >
                    Verify email address
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default AuthVerifyEmail;
