import { Container } from "@/components/ui/container"

export const metadata = {
    title: "Terms of Service | Creations",
    description: "Terms and conditions for using Creations accounting and compliance services.",
}

export default function TermsPage() {
    return (
        <main className="py-20 md:py-32">
            <Container>
                <div className="max-w-3xl mx-auto prose dark:prose-invert">
                    <h1>Terms of Service</h1>
                    <p className="text-text-secondary">Last Updated: {new Date().getFullYear()}</p>

                    <h2>1. Acceptance of Terms</h2>
                    <p>
                        By accessing and using this website and engaging with our services, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
                    </p>

                    <h2>2. Provision of Services</h2>
                    <p>
                        Creations provides professional accounting, tax, and compliance services. While we strive for accuracy, the information provided on this website is for general informational purposes only and does not constitute professional advice. You should not act upon this information without consulting one of our qualified professionals.
                    </p>

                    <h2>3. User Obligations</h2>
                    <p>
                        You agree to provide accurate and complete information when requested. We are not liable for any penalties, interest, or losses resulting from inaccurate or incomplete information provided by you. It is your responsibility to ensure that all documentation submitted to us is authentic and correct.
                    </p>

                    <h2>4. Limitation of Liability</h2>
                    <p>
                        To the fullest extent permitted by applicable law, Creations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the services; (b) any conduct or content of any third party on the services.
                    </p>

                    <h2>5. Intellectual Property</h2>
                    <p>
                        All content included on this site, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of Creations or its content suppliers and protected by international copyright laws.
                    </p>

                    <h2>6. Payment Terms</h2>
                    <p>
                        Payment for services is due as per the invoice terms. Failure to pay may result in suspension of services. We reserve the right to charge interest on overdue accounts in accordance with the National Credit Act.
                    </p>

                    <h2>7. Governing Law</h2>
                    <p>
                        These terms shall be governed by and construed in accordance with the laws of the Republic of South Africa. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the South African courts.
                    </p>

                    <h2>8. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. We will always post the most current version on our website. By continuing to use the services after changes become effective, you agree to be bound by the revised terms.
                    </p>

                    <h2>9. Contact Us</h2>
                    <p>
                        If you have any questions about these Terms, please contact us at info@creations.co.za.
                    </p>
                </div>
            </Container>
        </main>
    )
}
