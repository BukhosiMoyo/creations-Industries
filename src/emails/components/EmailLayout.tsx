import { Html, Head, Body, Container, Section, Img, Text, Link, Preview, Tailwind } from "@react-email/components";
import * as React from "react";

interface EmailLayoutProps {
    preview?: string;
    children: React.ReactNode;
}

export const EmailLayout = ({ preview, children }: EmailLayoutProps) => {
    return (
        <Html>
            <Head />
            {preview && <Preview>{preview}</Preview>}
            <Tailwind
                config={{
                    theme: {
                        extend: {
                            colors: {
                                primary: "#000000",
                                muted: "#666666",
                            },
                        },
                    },
                }}
            >
                <Body className="bg-white my-auto mx-auto font-sans">
                    <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
                        <Section className="mt-[32px] text-center">
                            <Img
                                src="https://creations.africa/logo.png"
                                alt="Creations"
                                width="180"
                                height="48"
                                className="mx-auto"
                            />
                        </Section>
                        <Section className="my-[32px]">
                            {children}
                        </Section>
                        <Section className="text-center text-[12px] text-[#666666] mt-[32px]">
                            <Text>
                                © {new Date().getFullYear()} Creations Industries. All rights reserved.
                            </Text>
                            <Text>
                                <Link href="{{dashboardUrl}}" className="text-[#666666] underline">
                                    Dashboard
                                </Link>{" "}
                                •{" "}
                                <Link href="mailto:{{supportEmail}}" className="text-[#666666] underline">
                                    Support
                                </Link>
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default EmailLayout;
