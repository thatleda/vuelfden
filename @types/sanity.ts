import type { PortableTextBlock } from '@portabletext/types'

export interface SanityPage {
  _id: string
  _createdAt: string
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
  _id: string
  _type: 'sanity.imageAsset'
  altText: string
}

export interface SanityBlockImage {
  alt: string
  asset: {
    _ref: string
  }
}

export interface SanityReview {
  _createdAt: string
  _id: string
  _updatedAt: string
  comment: string
  picture: SanityLinkedImage
  reviewer: string
}
