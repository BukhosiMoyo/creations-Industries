import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestCompletedClientProps {
    serviceType?: string;
    brandName?: string;
    portalUrl?: string;
}

export const RequestCompletedClient = ({
    serviceType = "{{serviceType}}",
    brandName = "{{brandName}}",
    portalUrl = "{{portalUrl}}",
}: RequestCompletedClientProps) => {
    return (
        <EmailLayout preview="All done.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Your request has been completed
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your <strong>{serviceType}</strong> request has been completed.
                <br />
                Thank you for working with {brandName}.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View summary
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestCompletedClient;
