import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface RequestStageUpdateClientProps {
    serviceType?: string;
    newStage?: string;
    portalUrl?: string;
}

export const RequestStageUpdateClient = ({
    serviceType = "{{serviceType}}",
    newStage = "{{newStage}}",
    portalUrl = "{{portalUrl}}",
}: RequestStageUpdateClientProps) => {
    return (
        <EmailLayout preview={`Update on your request: ${serviceType}`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Request Update: {serviceType}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Your request has moved to a new stage: <strong>{newStage}</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={portalUrl}
                >
                    View progress
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default RequestStageUpdateClient;
