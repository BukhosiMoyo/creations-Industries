import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestDocsNeededClientProps {
    serviceType?: string;
    portalUrl?: string;
}

export const RequestDocsNeededClient = ({
    serviceType = "{{serviceType}}",
    portalUrl = "{{portalUrl}}",
}: RequestDocsNeededClientProps) => {
    return (
        <EmailLayout preview="Action needed.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Documents required to proceed
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                We need additional documents to continue with <strong>{serviceType}</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    Upload documents
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestDocsNeededClient;
