import { Heading, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface AuthPasswordResetSuccessProps {
    supportEmail?: string;
}

export const AuthPasswordResetSuccess = ({
    supportEmail = "{{supportEmail}}",
}: AuthPasswordResetSuccessProps) => {
    return (
        <EmailLayout preview="Password change successful.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Your password has been updated
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your password was updated successfully.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
                If this wasn’t you, contact {supportEmail} immediately.
            </Text>
        </EmailLayout>
    );
};

export default AuthPasswordResetSuccess;
