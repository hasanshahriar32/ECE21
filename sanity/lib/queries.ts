import { groq } from 'next-sanity'

export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`
export const ladderQuery = groq`
  *[_type == "ladder"][0]{
    _id,
    overview,
    showcaseProjects[]->{
      _type,
      coverImage,
      overview,
      "slug": slug.current,
      tags,
      title,
    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    cloudinaryList,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`
export const allProjectSlugQuery = (page: number, limit: number) => groq`
  *[_type == "project"] | order(_updatedAt desc)[${(page - 1) * limit}...${
    page * limit
  }] {
    _id,
    client,
    coverImage,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
    _updatedAt
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[]->{
      _type,
      "slug": slug.current,
      title
    },
    ogImage,
  }
`
