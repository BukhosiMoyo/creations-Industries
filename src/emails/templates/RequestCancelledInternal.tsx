import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestCancelledInternalProps {
    serviceType?: string;
    clientName?: string;
    dashboardUrl?: string;
}

export const RequestCancelledInternal = ({
    serviceType = "{{serviceType}}",
    clientName = "{{clientName}}",
    dashboardUrl = "{{dashboardUrl}}",
}: RequestCancelledInternalProps) => {
    return (
        <EmailLayout preview={`Cancelled: ${serviceType}`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Request Cancelled
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Client: {clientName}
                <br />
                Service: {serviceType}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    View details
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestCancelledInternal;
