import { Button, Heading, Section, Text } from "@react-email/components";
import * as React from "react";
import EmailLayout from "../components/EmailLayout";

interface SystemXeroConnectedInternalProps {
    companyName?: string;
    dashboardUrl?: string;
}

export const SystemXeroConnectedInternal = ({
    companyName = "{{companyName}}",
    dashboardUrl = "{{dashboardUrl}}",
}: SystemXeroConnectedInternalProps) => {
    return (
        <EmailLayout preview="Xero connected successfully.">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                Xero Connected
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
                Xero has been successfully connected for <strong>{companyName}</strong>.
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                    className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                    href={dashboardUrl}
                >
                    View company
                </Button>
            </Section>
        </EmailLayout>
    );
};

export default SystemXeroConnectedInternal;
