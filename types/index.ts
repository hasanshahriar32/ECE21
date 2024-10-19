import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
  duration?: {
    start?: string
    end?: string
  }
  cloudinaryList?: any
}

// Page payloads

export interface HomePagePayload {
  seo?: SeoType
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}
export interface LadderPayload {
  footer?: PortableTextBlock[]
  overview?: PortableTextBlock[]
  showcaseProjects?: ShowcaseProject[]
  title?: string
}

export interface PagePayload {
  body?: PortableTextBlock[]
  seo?: SeoType
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  seo?: SeoType
  coverImage?: Image
  description?: PortableTextBlock[]
  cloudinaryList?: any
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
}

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: MenuItem[]
  ogImage?: Image
}

export type SeoType = {
  _type?: 'seo'
  nofollowAttributes?: boolean
  metaDescription?: string
  additionalMetaTags?: MetaTagType[]
  metaTitle?: string
  seoKeywords?: string[]
  openGraph?: OpenGraphType
  twitter?: Twitter
}

export type MetaTagType = {
  _type: 'metaTag'
  metaAttributes?: MetaAttributeType[]
}

export type MetaAttributeType = {
  _type: 'metaAttribute'
  attributeKey?: string
  attributeType?: string
  attributeValueString?: string
  attributeValueImage?: CustomImageType
}

export type OpenGraphType = {
  _type: 'openGraph'
  title: string
  url?: string
  siteName?: string
  description: string
  image: CustomImageType
}

export type Twitter = {
  _type: 'twitter'
  handle?: string
  creator?: string
  site?: string
  cardType?: string
}

export type CustomImageType = {
  _type: 'customImage'
  asset?: SanityImageAssetType
  crop?: {
    _type: 'SanityImageCrop'
    right: number
    top: number
    left: number
    bottom: number
  }
  hotspot?: {
    x: number
    y: number
    height: number
    _type: 'SanityImageHotspot'
    width?: number
  }
}

export type SanityImageAssetType = {
  _type?: 'SanityImageAsset'
  _id?: string
  path?: string
  url?: string
  metadata?: {
    _type?: 'SanityImageMetadata'
    dimensions?: {
      _type?: 'SanityImageDimensions'
      height?: number
      width?: number
    }
  }
}