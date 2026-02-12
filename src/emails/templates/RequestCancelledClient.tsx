import { Heading, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestCancelledClientProps {
    serviceType?: string;
    brandName?: string;
}

export const RequestCancelledClient = ({
    serviceType = "{{serviceType}}",
    brandName = "{{brandName}}",
}: RequestCancelledClientProps) => {
    return (
        <EmailLayout preview="Request cancelled.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Request Cancelled
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your <strong>{serviceType}</strong> request has been cancelled.
                <br />
                If you have any questions, please contact support.
            </Text>
            <Text className="text-black text-[14px] leading-[24px] mt-[24px]">
                {brandName} Team
            </Text>
        </EmailLayout>
    );
};

export default RequestCancelledClient;
