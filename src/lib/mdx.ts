import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPost, MdxFrontmatter } from '@/types/mdx'

const POSTS_PATH = path.join(process.cwd(), 'src/content/posts')

export function getPostSlugs(): string[] {
    if (!fs.existsSync(POSTS_PATH)) {
        return []
    }
    return fs.readdirSync(POSTS_PATH).filter((path) => /\.mdx?$/.test(path))
}

export function getPostBySlug(slug: string): BlogPost {
    const realSlug = slug.replace(/\.mdx?$/, '')
    const fullPath = path.join(POSTS_PATH, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
        slug: realSlug,
        frontmatter: data as MdxFrontmatter,
        content,
    }
}

export function getAllPosts(): BlogPost[] {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug))
        .sort((post1, post2) => (post1.frontmatter.date > post2.frontmatter.date ? -1 : 1))
    return posts
}

export function getPostsByCategory(category: string): BlogPost[] {
    const allPosts = getAllPosts()
    return allPosts.filter((post) => post.frontmatter.category.toLowerCase() === category.toLowerCase())
}
