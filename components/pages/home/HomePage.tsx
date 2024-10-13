import type { EncodeDataAttributeCallback } from '@sanity/react-loader'
import Link from 'next/link'
import { Suspense } from 'react'

import { ProjectListItem } from '@/components/pages/home/ProjectListItem'
import AllProjects from '@/components/shared/allProjects'
import { Header } from '@/components/shared/Header'
import { resolveHref } from '@/sanity/lib/utils'
import type { HomePagePayload } from '@/types'

import { Gemini } from './Gemini'
import { GlobeView } from './GlobeView'
import { TimelineShowcase } from './TimelineShowcase'

export interface HomePageProps {
  data: HomePagePayload | null
  data2: any
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, data2, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { overview = [], showcaseProjects = [], title = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} description={overview} />}
      {/* Showcase projects */}
      {showcaseProjects && showcaseProjects.length > 0 && (
        <div className="mx-auto max-w-[100rem] rounded-md border">
          {showcaseProjects.map((project, key) => {
            const href = resolveHref(project?._type, project?.slug)
            if (!href) {
              return null
            }
            return (
              <Link
                key={key}
                href={href}
                data-sanity={encodeDataAttribute?.([
                  'showcaseProjects',
                  key,
                  'slug',
                ])}
              >
                <ProjectListItem project={project} odd={key % 2} />
              </Link>
            )
          })}
        </div>
      )}
      <TimelineShowcase />
      <AllProjects data2={data2} />
      <Gemini />
      <Suspense><GlobeView /></Suspense>
      
    </div>
  )
}

export default HomePage
