import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestDelayedClientProps {
    serviceType?: string;
    delayReason?: string;
    portalUrl?: string;
}

export const RequestDelayedClient = ({
    serviceType = "{{serviceType}}",
    delayReason = "{{delayReason}}",
    portalUrl = "{{portalUrl}}",
}: RequestDelayedClientProps) => {
    return (
        <EmailLayout preview={`Update regarding your ${serviceType} request.`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Update on your request
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We are experiencing a delay with your <strong>{serviceType}</strong> request.
                <br />
                Reason: {delayReason}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View details
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestDelayedClient;
