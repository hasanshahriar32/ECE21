'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/page.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { cloudinaryAssetSourcePlugin, cloudinaryImageSource } from 'sanity-plugin-cloudinary'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'
import { latexInput } from 'sanity-plugin-latex-input'
import { seoMetaFields } from 'sanity-plugin-seo'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import page from '@/sanity/schemas/documents/page'
import project from '@/sanity/schemas/documents/project'
import duration from '@/sanity/schemas/objects/duration'
import latexEquation from '@/sanity/schemas/objects/latexEquation'
import milestone from '@/sanity/schemas/objects/milestone'
import timeline from '@/sanity/schemas/objects/timeline'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'

import ladder from './sanity/schemas/singletons/ladder'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'ঋণাত্মক - ২১ - HSTU ECE 21 Batch'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      ladder,
      // Documents
      duration,
      page,
      project,
      // Objects
      milestone,
      timeline,
      latexEquation
    ],
  },
  plugins: [
    cloudinaryAssetSourcePlugin(),
    seoMetaFields(),
    latexInput(),
    cloudinarySchemaPlugin(),
    structureTool({
      structure: pageStructure([home, ladder, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, ladder.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  form: {
    image: {
      assetSources: (previousAssetSources, context) => {
        if (context.currentUser?.roles.includes('cloudinaryAccess')) {
          // appends cloudinary as an asset source
          return [...previousAssetSources, cloudinaryImageSource]
        }
        if (context.currentUser?.roles.includes('onlyCloudinaryAccess')) {
          // only use clooudinary as an asset source
          return [cloudinaryImageSource]
        }
        // dont add cloudnary as an asset sources
        return previousAssetSources
      },
    },
  },
})
