import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  trailingSlash: false,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts", "date-fns"],
  },
  async redirects() {
    return [
      // 1. Accounting Redirects (Spam/Duplicate -> Pillar)
      { source: '/services/accounting-services-south-africa', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-and-bookkeeping-services', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-and-bookkeeping-services-south-africa', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-packages', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-firm', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-company', destination: '/services/accounting', permanent: true },
      { source: '/services/business-accounting-services', destination: '/services/accounting', permanent: true },
      { source: '/services/monthly-accounting-services', destination: '/services/accounting', permanent: true },
      { source: '/services/small-business-accounting-services', destination: '/services/accounting', permanent: true },
      { source: '/services/outsourcing-accounting-services', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-tenders', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-cape-town', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-durban', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-bellville', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services-umhlanga', destination: '/services/accounting', permanent: true },
      { source: '/services/accounting-services', destination: '/services/accounting', permanent: true },

      // 2. Bookkeeping Redirects (Spam/Duplicate -> Pillar)
      { source: '/services/bookkeeping-service-small-business', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-near-me', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-south-africa', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/business-bookkeeping-services', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/monthly-bookkeeping-services', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/outsourced-bookkeeping-services', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/professional-bookkeeping-services', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/small-business-bookkeeping', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-cape-town', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-durban', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-bellville', destination: '/services/bookkeeping', permanent: true },
      { source: '/services/bookkeeping-services-umhlanga', destination: '/services/bookkeeping', permanent: true },

      // 3. Tax Redirects (Spam/Duplicate -> Pillar)
      { source: '/services/business-tax-services', destination: '/services/tax', permanent: true },
      { source: '/services/corporate-income-tax-returns-itr14', destination: '/services/tax', permanent: true },
      { source: '/services/outsourced-tax-services', destination: '/services/tax', permanent: true },
      { source: '/services/personal-income-tax-returns-itr12', destination: '/services/tax', permanent: true },
      { source: '/services/provisional-tax-services', destination: '/services/tax', permanent: true },
      { source: '/services/sole-proprietor-tax', destination: '/services/tax', permanent: true },
      { source: '/services/tax-and-accounting-services', destination: '/services/tax', permanent: true },
      { source: '/services/tax-compliance-services', destination: '/services/tax', permanent: true },
      { source: '/services/tax-consulting-services', destination: '/services/tax', permanent: true },
      { source: '/services/tax-management-services', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-near-me', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-south-africa', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-small-business', destination: '/services/tax', permanent: true },
      { source: '/services/taxes-and-accounting-services', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-cape-town', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-durban', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-bellville', destination: '/services/tax', permanent: true },
      { source: '/services/tax-services-umhlanga', destination: '/services/tax', permanent: true },
      { source: '/services/vat-registration', destination: '/services/tax', permanent: true },
      { source: '/services/vat-returns-submissions', destination: '/services/tax', permanent: true },
      { source: '/services/vat-reconciliations', destination: '/services/tax', permanent: true },
      { source: '/services/vat-deregistration', destination: '/services/tax', permanent: true },

      // 4. Pretoria Redirects (Duplicate -> Location Service)
      { source: '/services/accounting-services-pretoria', destination: '/locations/pretoria/accounting', permanent: true },
      { source: '/services/bookkeeping-services-pretoria', destination: '/locations/pretoria/bookkeeping', permanent: true },
      { source: '/services/tax-services-pretoria', destination: '/locations/pretoria/tax', permanent: true },

      // 5. Johannesburg/Randburg/Sandton Redirects (Duplicate -> Location Hub)
      { source: '/services/accounting-services-johannesburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/accounting-services-randburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/accounting-services-sandton', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/bookkeeping-services-johannesburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/bookkeeping-services-randburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/bookkeeping-services-sandton', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/tax-services-johannesburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/tax-services-randburg', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/tax-services-sandton', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/accounting-services-roodepoort', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/bookkeeping-services-roodepoort', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/tax-services-roodepoort', destination: '/locations/johannesburg', permanent: true },
      { source: '/services/payroll-services-roodepoort', destination: '/locations/johannesburg', permanent: true },

      // 6. Centurion/Midrand Redirects (Duplicate -> Location Hub)
      { source: '/services/accounting-services-centurion', destination: '/locations/centurion', permanent: true },
      { source: '/services/bookkeeping-services-centurion', destination: '/locations/centurion', permanent: true },
      { source: '/services/tax-services-centurion', destination: '/locations/centurion', permanent: true },
      { source: '/services/accounting-services-midrand', destination: '/locations/centurion', permanent: true },
      { source: '/services/bookkeeping-services-midrand', destination: '/locations/centurion', permanent: true },
      { source: '/services/tax-services-midrand', destination: '/locations/centurion', permanent: true },
      { source: '/services/payroll-services-midrand', destination: '/locations/centurion', permanent: true },

      // 7. Payroll Spam -> Payroll Service (Noindex)
      { source: '/services/monthly-payroll-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/outsourced-payroll-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/outsourced-payroll-services-south-africa', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-management-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-processing-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services-south-africa', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services-small-business', destination: '/services/payroll-service', permanent: true },
      { source: '/services/small-business-payroll-services', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services-pretoria', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services-johannesburg', destination: '/services/payroll-service', permanent: true },
      { source: '/services/payroll-services-centurion', destination: '/services/payroll-service', permanent: true },

      // 8. CIPC/Compliance Spam -> CIPC (Noindex)
      { source: '/services/cipc-annual-returns', destination: '/services/cipc-compliance', permanent: true },
      { source: '/services/companies-act-compliance', destination: '/services/cipc-compliance', permanent: true },
      { source: '/services/company-registration-pty-ltd-npc', destination: '/services/cipc-compliance', permanent: true },
      { source: '/services/director-changes-add-remove', destination: '/services/cipc-compliance', permanent: true },
      { source: '/services/share-certificates-registers', destination: '/services/cipc-compliance', permanent: true },
    ]
  },
};

export default nextConfig;
