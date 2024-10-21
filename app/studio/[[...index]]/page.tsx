/**
 * This route is responsible for the built-in authoring environment using Sanity Studio v3.
 * All routes under /studio will be handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'

import config from '@/sanity.config'

export const dynamic = 'force-static'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return (
    <NextStudio
      config={config}
      // Turn off login in production so that anyone can look around in the Studio and see how it works
      // eslint-disable-next-line no-process-env
      unstable_noAuthBoundary={process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'}
    />
  )
}
