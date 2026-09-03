import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: false, linkify: true })

function parseFrontmatter(raw: string): { data: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }
  const [, frontmatter, content] = match
  const data: Record<string, string> = {}
  for (const line of frontmatter.split(/\r?\n/)) {
    const fieldMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!fieldMatch) continue
    const [, key, rawValue] = fieldMatch
    let value = rawValue.trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, content }
}

export interface ArticleContent {
  slug: string
  title: string
  description?: string
  image?: string
  date?: string
  html: string
}

interface LegalContent {
  slug: string
  title: string
  html: string
}

const articleFiles = import.meta.glob('../../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const legalFiles = import.meta.glob('../../content/legal/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

function slugFromPath(path: string) {
  return path.split('/').pop()!.replace(/\.md$/, '')
}

function excerpt(content: string, maxLength = 160) {
  const firstParagraph = content.trim().split(/\n\s*\n/)[0] ?? ''
  const plain = firstParagraph
    .replace(/^#+\s*/, '')
    .replace(/[*_`#]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
  return plain.length > maxLength ? `${plain.slice(0, maxLength).trimEnd()}…` : plain
}

const articles: ArticleContent[] = Object.entries(articleFiles)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title as string,
      description: (data.description as string | undefined) ?? excerpt(content),
      image: data.image as string | undefined,
      date: data.date as string | undefined,
      html: md.render(content)
    }
  })
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

const legalPages: Record<string, LegalContent> = Object.fromEntries(
  Object.entries(legalFiles).map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = slugFromPath(path)
    return [slug, { slug, title: data.title as string, html: md.render(content) }]
  })
)

export function useArticles(): ArticleContent[] {
  return articles
}

export function useArticle(slug: string): ArticleContent | undefined {
  return articles.find((a) => a.slug === slug)
}

export function useLegalPage(slug: string): LegalContent | undefined {
  return legalPages[slug]
}
