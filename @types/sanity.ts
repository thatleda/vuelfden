import type { PortableTextBlock } from '@portabletext/types'

export interface SanityPage {
  _id: string
  _createdAt: string
  _updatedAt: string
  banner?: SanityLinkedImage
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

export interface SanitySkillGroup {
  _key: string
  category: string
  items: string[]
}

export interface SanityExperienceEntry {
  _key: string
  company: string
  title?: string
  startDate?: string
  endDate?: string
  location?: string
  note?: string
  bullets?: string[]
}

export interface SanityEducationEntry {
  _key: string
  degree?: string
  institution?: string
  year?: string
  note?: string
}

export interface SanityResume {
  _id: string
  profile: string
  skills: SanitySkillGroup[]
  experience: SanityExperienceEntry[]
  education: SanityEducationEntry[]
  additionalSkills: string[]
}
