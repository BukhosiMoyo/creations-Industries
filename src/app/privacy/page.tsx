import { Container } from "@/components/ui/container"

export const metadata = {
    title: "Privacy Policy | Creations",
    description: "Privacy Policy outlining how we collect, use, and protect your personal information in compliance with POPIA.",
}

export default function PrivacyPage() {
    return (
        <main className="py-20 md:py-32">
            <Container>
                <div className="max-w-3xl mx-auto prose dark:prose-invert">
                    <h1>Privacy Policy</h1>
                    <p className="text-text-secondary">Last Updated: {new Date().getFullYear()}</p>

                    <h2>1. Introduction</h2>
                    <p>
                        Creations ("we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services, in compliance with the Protection of Personal Information Act (POPIA).
                    </p>

                    <h2>2. Information We Collect</h2>
                    <p>
                        We may collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
                    </p>
                    <ul>
                        <li><strong>Personal Data:</strong> Personally identifiable information, such as your name, shipping address, email address, and telephone number, and demographic information, such as your age, gender, hometown, and interests, that you voluntarily give to us.</li>
                        <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Site, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Site.</li>
                    </ul>

                    <h2>3. Use of Your Information</h2>
                    <p>
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
                    </p>
                    <ul>
                        <li>Provide, operate, and maintain our website and services.</li>
                        <li>Improve, personalize, and expand our website.</li>
                        <li>Understand and analyze how you use our website.</li>
                        <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                        <li>Send you emails.</li>
                        <li>Find and prevent fraud.</li>
                        <li>Comply with legal obligations, such as FICA and SARS requirements.</li>
                    </ul>

                    <h2>4. Disclosure of Your Information</h2>
                    <p>
                        We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                    </p>
                    <ul>
                        <li><strong>By Law or to Protect Rights:</strong> If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.</li>
                        <li><strong>Third-Party Service Providers:</strong> We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.</li>
                    </ul>

                    <h2>5. Security of Your Information</h2>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                    </p>

                    <h2>6. Your Rights (POPIA & PAIA)</h2>
                    <p>
                        Under the Protection of Personal Information Act (POPIA) and the Promotion of Access to Information Act (PAIA), you have the right to:
                    </p>
                    <ul>
                        <li>Request access to the personal information we hold about you.</li>
                        <li>Request the correction or deletion of your personal information.</li>
                        <li>Object to the processing of your personal information.</li>
                        <li>Complain to the Information Regulator if you believe your rights have been infringed.</li>
                    </ul>

                    <h2>7. Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us at info@creations.africa.
                    </p>
                </div>
            </Container>
        </main>
    )
}
