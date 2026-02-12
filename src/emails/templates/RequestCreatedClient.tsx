import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestCreatedClientProps {
    serviceType?: string;
    requestId?: string;
    portalUrl?: string;
}

export const RequestCreatedClient = ({
    serviceType = "{{serviceType}}",
    requestId = "{{requestId}}",
    portalUrl = "{{portalUrl}}",
}: RequestCreatedClientProps) => {
    return (
        <EmailLayout preview="Your request has been received.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Request received: {serviceType}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We have received your new request for <strong>{serviceType}</strong>.
                <br />
                Reference ID: {requestId}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View request
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestCreatedClient;
