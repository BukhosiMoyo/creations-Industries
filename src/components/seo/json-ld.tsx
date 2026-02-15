import type {
    Organization,
    WithContext,
    Service,
    FAQPage,
    Article,
    BreadcrumbList,
    LocalBusiness,
    AboutPage,
    ContactPage,
    ProfessionalService,
    Product
} from 'schema-dts'

type SchemaType =
    | WithContext<Organization>
    | WithContext<Service>
    | WithContext<FAQPage>
    | WithContext<Article>
    | WithContext<BreadcrumbList>
    | WithContext<LocalBusiness>
    | WithContext<AboutPage>
    | WithContext<ContactPage>
    | WithContext<ProfessionalService>
    | WithContext<Product>

interface JsonLdProps {
    data: SchemaType
}

export function JsonLd({ data }: JsonLdProps) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    )
}
