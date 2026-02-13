import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default async function PortalProfilePage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.companyId) {
        redirect("/portal");
    }

    const company = await prisma.clientCompany.findUnique({
        where: { id: session.user.companyId },
        include: {
            contacts: true
        }
    });

    if (!company) {
        return <div>Company profile not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your account and company settings</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>My Account</CardTitle>
                        <CardDescription>Your personal user details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16">
                                <AvatarImage src={session.user.image || ""} />
                                <AvatarFallback className="text-lg">{session.user.name?.[0] || "U"}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-medium text-lg">{session.user.name}</h3>
                                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                                <div className="mt-1 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                    {session.user.role}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Company Details</CardTitle>
                        <CardDescription>Legal entity information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Legal Name</Label>
                            <Input value={company.legalName} readOnly className="bg-muted" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Registration Number</Label>
                            <Input value={company.registrationNumber || "N/A"} readOnly className="bg-muted" />
                        </div>
                        <div className="grid gap-2">
                            <Label>Tax/VAT Number</Label>
                            <Input value={company.vatNumber || "N/A"} readOnly className="bg-muted" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Company Contacts</CardTitle>
                        <CardDescription>Authorized contacts for {company.tradingName || company.legalName}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {company.contacts.length === 0 ? (
                                <div className="text-sm text-muted-foreground">No additional contacts listed.</div>
                            ) : (
                                <table className="w-full text-sm text-left">
                                    <thead className="text-muted-foreground font-medium border-b">
                                        <tr>
                                            <th className="pb-2">Name</th>
                                            <th className="pb-2">Email</th>
                                            <th className="pb-2">Role</th>
                                            <th className="pb-2 text-right">Primary</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {company.contacts.map(contact => (
                                            <tr key={contact.id} className="border-b last:border-0">
                                                <td className="py-3 font-medium">{contact.fullName}</td>
                                                <td className="py-3">{contact.email}</td>
                                                <td className="py-3">{contact.roleTitle}</td>
                                                <td className="py-3 text-right">
                                                    {contact.isPrimary && <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">Primary</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
