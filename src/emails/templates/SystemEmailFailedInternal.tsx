import { Heading, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface SystemEmailFailedInternalProps {
    subject?: string;
    recipient?: string;
    errorDetails?: string;
}

export const SystemEmailFailedInternal = ({
    subject = "{{subject}}",
    recipient = "{{recipient}}",
    errorDetails = "{{errorDetails}}",
}: SystemEmailFailedInternalProps) => {
    return (
        <EmailLayout preview="Email delivery failed.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Email Delivery Failed
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Failed to send email.
                <br />
                Subject: {subject}
                <br />
                Recipient: {recipient}
                <br />
                Error: {errorDetails}
            </Text>
        </EmailLayout>
    );
};

export default SystemEmailFailedInternal;
