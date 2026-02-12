import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestDocsUploadedClientProps {
    serviceType?: string;
    portalUrl?: string;
}

export const RequestDocsUploadedClient = ({
    serviceType = "{{serviceType}}",
    portalUrl = "{{portalUrl}}",
}: RequestDocsUploadedClientProps) => {
    return (
        <EmailLayout preview="Documents received.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Documents uploaded successfully
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We have received the documents you uploaded for your <strong>{serviceType}</strong> request.
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

export default RequestDocsUploadedClient;
