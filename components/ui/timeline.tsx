'use client'
import { EncodeDataAttributeCallback } from '@sanity/react-loader'
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PortableTextBlock } from 'next-sanity'
import React, { useEffect, useRef, useState } from 'react'

import { resolveHref } from '@/sanity/lib/utils'
import { LadderPayload } from '@/types'

import { CustomPortableText } from '../shared/CustomPortableText'

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

export const Timeline = ({
  data,
  data1,
  encodeDataAttribute1,
}: {
  data: TimelineEntry[]
  data1: LadderPayload | null
  encodeDataAttribute1?: EncodeDataAttributeCallback
}) => {
  const { showcaseProjects = [], title = '' } = data1 ?? {}

  const ref = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setHeight(rect.height)
    }
  }, [ref])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 50%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1])
  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      {title && (
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <h2 className="text-2xl lg:text-6xl font-bold md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
            {data1?.title}
          </h2>

          <div className="text-neutral-700 font-serif dark:text-neutral-300 text-lg md:text-xl lg:text-2xl text-gray-500 max-w-sm">
            <CustomPortableText
              value={data1?.overview as PortableTextBlock[]}
            />
          </div>
        </div>
      )}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {showcaseProjects && showcaseProjects.length > 0 && (
          <div className="">
            {showcaseProjects.map((project, key) => {
              const href = resolveHref(project?._type, project?.slug)
              const item = project
              if (!href) {
                return null
              }
              return (
                <div
                  key={key}
                  // href={href}
                  data-sanity={encodeDataAttribute1?.([
                    'showcaseProjects',
                    key,
                    'slug',
                  ])}
                >
                  {/* <ProjectListItem project={project} odd={key % 2} /> */}
                  <div className="flex justify-start pt-10 md:pt-40 md:gap-10">
                    <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                      <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                      </div>
                      <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                        {new Date(
                          item?.duration?.start ?? new Date(),
                        ).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: '2-digit',
                        })}
                        -{' '}
                        {new Date(
                          item?.duration?.end ?? new Date(),
                        ).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: '2-digit',
                        })}
                      </h3>
                    </div>

                    <Link href={href} className="relative pl-20 pr-4 md:pl-4 w-full">
                      <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                        {new Date(
                          item?.duration?.start ?? new Date(),
                        ).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: '2-digit',
                        })}
                        -{' '}
                        {new Date(
                          item?.duration?.end ?? new Date(),
                        ).toLocaleDateString('en-CA', {
                          year: 'numeric',
                          month: '2-digit',
                        })}
                      </h3>
                      {/* {item?.content}{' '} */}

                      <p className="text-neutral-800 dark:text-neutral-200 text-base font-semibold md:text-sm font-normal mb-8">
                        {item.title}
                      </p>
                      <div className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-4">
                        <CustomPortableText
                          value={item?.overview as PortableTextBlock[]}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {item?.cloudinaryList
                          ?.slice(0, 4)
                          ?.map((image, index) => (
                            <Image
                              key={index}
                              src={image.url}
                              alt={image.alt || `Image ${index + 1}`}
                              width={500}
                              height={500}
                              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
                            />
                          ))}
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div
          style={{
            height: height + 'px',
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  )
}
