import { groq } from 'next-sanity'


export const imageFields = /* groq */ `
_type,
crop{
_type,
right,
top,
left,
bottom
},
hotspot{
_type,
x,
y,
height,
width,
},
asset->{...}
`


export const twitterQuery = /* groq */ `
_type,
site,
creator,
cardType,
handle
`

export const openGraphQuery = /* groq */ `
_type,
siteName,
url,
description,
title,
image{
${imageFields}
}
`

export const metaAttributesQuery = /* groq */ `
_type,
attributeValueString,
attributeType,
attributeKey,
attributeValueImage{
${imageFields}
}
`

export const seofields = /* groq */ `
_type,
metaTitle,
nofollowAttributes,
seoKeywords,
metaDescription,
openGraph{
${openGraphQuery}
},
twitter{
${twitterQuery}
},
additionalMetaTags[]{
_type,
metaAttributes[]{
${metaAttributesQuery}
}
}
`
export const seo = /* groq */ `seo{
${seofields}
}`



export const homePageQuery = groq`
  *[_type == "home"][0]{
    _id,
    ${seo},
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
      cloudinaryList,
      duration

    },
    title,
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    _id,
    ${seo},
    body,
    overview,
    title,
    "slug": slug.current,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    ${seo},
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
