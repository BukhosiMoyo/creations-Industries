import Link from "next/link"
import { getAllPosts } from "@/lib/mdx"
import { Container } from "@/components/ui/container"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar, Clock, BookOpen, Tag } from "lucide-react"
import { format } from "date-fns"
import { MotionWrapper, StaggerChildren } from "@/components/ui/motion-wrapper"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Financial Insights | Creations Accounting",
    description: "Expert advice on tax compliance, business growth, and financial management for South African SMEs.",
}

export default function InsightsPage() {
    const posts = getAllPosts()
    const featuredPost = posts[0]
    const otherPosts = posts.slice(1)

    return (
        <div className="flex flex-col">
            {/* HERO */}
            <SectionWrapper variant="base" padding="lg" showGlow className="border-b border-border/40">
                <Container>
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <MotionWrapper>
                            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary mb-6 font-medium">
                                <BookOpen className="h-3.5 w-3.5 mr-2" /> Knowledge Hub
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                Financial Intelligence for SA Business
                            </h1>
                            <p className="text-text-secondary text-lg">
                                Practical guides, tax updates, and growth strategies. Written by accountants, not bots.
                            </p>
                        </MotionWrapper>
                    </div>

                    {/* FEATURED POST */}
                    {featuredPost && (
                        <MotionWrapper delay={0.2}>
                            <Link href={`/insights/${featuredPost.slug}`}>
                                <Card className="group overflow-hidden border-border/50 hover:border-primary/50 transition-all bg-surface hover:shadow-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center">
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-3 text-sm text-text-muted">
                                                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {format(new Date(featuredPost.frontmatter.date), "MMM d, yyyy")}</span>
                                                <span className="h-1 w-1 rounded-full bg-border" />
                                                <span className="text-primary font-medium">{featuredPost.frontmatter.category}</span>
                                            </div>
                                            <h2 className="text-3xl font-bold group-hover:text-primary transition-colors leading-tight">
                                                {featuredPost.frontmatter.title}
                                            </h2>
                                            <p className="text-text-secondary text-lg line-clamp-3">
                                                {featuredPost.frontmatter.description}
                                            </p>
                                            <div className="flex items-center gap-2 text-primary font-medium group-hover:underline underline-offset-4">
                                                Read Article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                        <div className="h-full min-h-[300px] w-full bg-surface-elevated rounded-xl border border-border/50 flex items-center justify-center text-text-muted">
                                            {/* Placeholder for real image */}
                                            {featuredPost.frontmatter.image ? (
                                                <div className="text-sm">Image Placeholder: {featuredPost.frontmatter.image}</div>
                                            ) : (
                                                <BookOpen className="h-16 w-16 opacity-20" />
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </MotionWrapper>
                    )}
                </Container>
            </SectionWrapper>

            {/* RECENT POSTS GRID */}
            <SectionWrapper variant="surface" padding="lg">
                <Container>
                    <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherPosts.map((post, i) => (
                            <MotionWrapper key={post.slug} delay={i * 0.1}>
                                <Link href={`/insights/${post.slug}`} className="h-full block">
                                    <Card className="h-full flex flex-col hover:border-primary/40 transition-all hover:-translate-y-1 bg-background group">
                                        <CardHeader>
                                            <div className="flex items-center justify-between text-xs text-text-muted mb-3">
                                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {format(new Date(post.frontmatter.date), "MMM d, yyyy")}</span>
                                                <span className="text-primary/80 bg-primary/5 px-2 py-0.5 rounded-full">{post.frontmatter.category}</span>
                                            </div>
                                            <CardTitle className="text-xl leading-snug group-hover:text-primary transition-colors">
                                                {post.frontmatter.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <p className="text-text-secondary text-sm line-clamp-3">
                                                {post.frontmatter.description}
                                            </p>
                                        </CardContent>
                                        <CardFooter className="pt-0 text-sm font-medium text-text-primary flex items-center gap-2">
                                            Read More <ArrowRight className="h-3.5 w-3.5 text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                        </CardFooter>
                                    </Card>
                                </Link>
                            </MotionWrapper>
                        ))}
                    </StaggerChildren>
                </Container>
            </SectionWrapper>
        </div>
    )
}
