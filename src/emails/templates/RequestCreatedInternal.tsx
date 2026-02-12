import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestCreatedInternalProps {
    serviceType?: string;
    clientName?: string;
    urgency?: string;
    dashboardUrl?: string;
}

export const RequestCreatedInternal = ({
    serviceType = "{{serviceType}}",
    clientName = "{{clientName}}",
    urgency = "{{urgency}}",
    dashboardUrl = "{{dashboardUrl}}",
}: RequestCreatedInternalProps) => {
    return (
        <EmailLayout preview={`New request from ${clientName}`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                New Request: {serviceType}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Client: {clientName}
                <br />
                Service: {serviceType}
                <br />
                Urgency: {urgency}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    View request
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestCreatedInternal;
