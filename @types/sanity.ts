import type { PortableTextBlock } from '@portabletext/types'

export interface SanityArticle {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'article'
  _updatedAt: string
  banner: SanityLinkedImage
  content: PortableTextBlock[]
  excerpt: string
  slug: {
    _type: 'slug'
    current: string
  }
  title: string
}

export interface SanityPage {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'page'
  _updatedAt: string
  banner: SanityLinkedImage
  content: PortableTextBlock[]
  excerpt: string
  slug: {
    _type: 'slug'
    current: string
  }
  title: string
}

export interface SanityLinkedImage {
  _type: 'image'
  alt: string
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export interface SanityReview {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'review'
  _updatedAt: string
  comment: string
  picture: SanityLinkedImage
  reviewer: string
}

export interface SanityBook {
  _createdAt: string
  _id: string
  _rev: string
  _type: 'book'
  _updatedAt: string
  author: string
  cover: SanityLinkedImage
  notes: PortableTextBlock[]
  number: number
  title: string
  url: string
}
