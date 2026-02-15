export interface MdxFrontmatter {
    title: string
    date: string
    description: string
    author?: string
    category: string
    tags?: string[]
    image?: string
    readingTime?: string
}

export interface BlogPost {
    slug: string
    frontmatter: MdxFrontmatter
    content: string
}
