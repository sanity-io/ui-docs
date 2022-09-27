import {SanityArrayItemValue, SanityBlockValue} from '~/sanity'

export interface ArticleCodeBlockData {
  _type: 'code'
  code: string | null
  language: 'jsx' | null
}

export interface CodeExampleData {
  _type: 'codeExample'
  description: string | null
  caption: string | null
  title: string | null
  code: {
    _type: 'code'
    code: string
    language: string
  } | null
}

export interface ArticleData {
  _type: 'article'
  _id: string
  _rev: string
  _createdAt: string
  _updatedAt: string
  content: SanityArrayItemValue<SanityBlockValue | ArticleCodeBlockData | CodeExampleData>[] | null
  title: string | null
  figma: {url: string | null} | null
}
