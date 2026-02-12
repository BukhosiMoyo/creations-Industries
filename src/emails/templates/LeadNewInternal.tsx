import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface LeadNewInternalProps {
    serviceType?: string;
    urgency?: string;
    budgetRange?: string;
    dashboardUrl?: string;
}

export const LeadNewInternal = ({
    serviceType = "{{serviceType}}",
    urgency = "{{urgency}}",
    budgetRange = "{{budgetRange}}",
    dashboardUrl = "{{dashboardUrl}}",
}: LeadNewInternalProps) => {
    return (
        <EmailLayout preview={`New lead received — ${serviceType}`}>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                New lead received — {serviceType}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Service: {serviceType}
                <br />
                Urgency: {urgency}
                <br />
                Budget: {budgetRange}
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    View lead
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default LeadNewInternal;
