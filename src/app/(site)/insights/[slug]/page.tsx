import { getPostBySlug, getAllPosts } from "@/lib/mdx"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { MDXRemote } from "next-mdx-remote/rsc"
import { components } from "@/components/mdx/mdx-components"
import { Metadata } from "next"
import { constructMetadata } from "@/lib/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import { Article, WithContext } from "schema-dts"
import { RelatedServices } from "@/components/mdx/related-services"

interface PageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params
    const post = getPostBySlug(resolvedParams.slug)

    if (!post) {
        return {
            title: "Article Not Found",
        }
    }

    return constructMetadata({
        title: `${post.frontmatter.title} | Creations Insights`,
        description: post.frontmatter.description,
        canonical: `/insights/${resolvedParams.slug}`
    })
}

// Static Params Generation
export async function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function BlogPostPage({ params }: PageProps) {
    const resolvedParams = await params
    let post
    try {
        post = getPostBySlug(resolvedParams.slug)
    } catch (e) {
        notFound()
    }

    const jsonLd: WithContext<Article> = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.frontmatter.title,
        description: post.frontmatter.description,
        image: post.frontmatter.image ? [`https://creations.co.za${post.frontmatter.image}`] : [],
        datePublished: post.frontmatter.date,
        author: {
            "@type": "Person",
            name: post.frontmatter.author || "Creations Team",
        },
        publisher: {
            "@type": "Organization",
            name: "Creations Accounting",
            logo: {
                "@type": "ImageObject",
                url: "https://creations.co.za/logo.png"
            }
        }
    }

    return (
        <article className="flex flex-col min-h-screen">
            <JsonLd data={jsonLd} />
            {/* HEADER */}
            <SectionWrapper variant="base" padding="lg" className="border-b border-border/40 bg-surface">
                <Container className="max-w-3xl">
                    <Link href="/insights" className="inline-flex items-center text-sm text-text-muted hover:text-primary transition-colors mb-8 group">
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Insights
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {post.frontmatter.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4" />
                            {format(new Date(post.frontmatter.date), "MMMM d, yyyy")}
                        </span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4" />
                            {post.frontmatter.readingTime || "5 min read"}
                        </span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] mb-6">
                        {post.frontmatter.title}
                    </h1>

                    <p className="text-xl text-text-secondary leading-relaxed border-l-4 border-primary pl-6 py-1">
                        {post.frontmatter.description}
                    </p>
                </Container>
            </SectionWrapper>

            {/* CONTENT */}
            <SectionWrapper variant="surface" padding="lg">
                <Container className="max-w-3xl">
                    <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl prose-img:border prose-img:border-border prose-img:shadow-sm">
                        <MDXRemote source={post.content} components={components} />
                    </div>

                    {/* TAGS */}
                    {post.frontmatter.tags && (
                        <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
                            <div className="flex items-center gap-2 text-sm font-semibold text-text-primary mr-2">
                                <Tag className="h-4 w-4" /> Tags:
                            </div>
                            {post.frontmatter.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-surface-elevated border border-border rounded-md text-sm text-text-secondary">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* AUTHOR */}
                    <div className="mt-8 p-6 bg-surface-elevated rounded-xl border border-border flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-text-primary">{post.frontmatter.author || "Creations Team"}</div>
                            <div className="text-sm text-text-secondary">Official Editorial Team</div>
                        </div>
                    </div>
                    {/* RELATED SERVICES */}
                    <RelatedServices tags={post.frontmatter.tags} category={post.frontmatter.category} />
                </Container>
            </SectionWrapper>
        </article>
    )
}
