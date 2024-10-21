import 'katex/dist/katex.min.css' // Import the KaTeX CSS for styling

import katex from 'katex'
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponents,
} from 'next-sanity'
import type { Image } from 'sanity'

import ImageBox from '@/components/shared/ImageBox'
import { TimelineSection } from '@/components/shared/TimelineSection'

export function CustomPortableText({
  paragraphClasses,
  value,
}: {
  paragraphClasses?: string
  value: PortableTextBlock[]
}) {
  const components: PortableTextComponents = {
    block: {
      normal: ({ children }) => {
        return <p className={paragraphClasses}>{children}</p>
      },
    },
    marks: {
      link: ({ children, value }) => {
        return (
          <a
            className="underline transition hover:opacity-50"
            href={value?.href}
            rel="noreferrer noopener"
          >
            {children}
          </a>
        )
      },
    },
    types: {
      image: ({
        value,
      }: {
        value: Image & { alt?: string; caption?: string }
      }) => {
        return (
          <div className="my-6 space-y-2">
            <ImageBox
              image={value}
              alt={value.alt}
              classesWrapper="relative aspect-[16/9]"
            />
            {value?.caption && (
              <div className="font-sans text-sm text-gray-600">
                {value.caption}
              </div>
            )}
          </div>
        )
      },
      timeline: ({ value }) => {
        const { items } = value || {}
        return <TimelineSection timelines={items} />
      },
      latexEquation: ({ value }) => {
        const renderEquation = (equation: any) => {
          if (equation._type === 'latex') {
            return (
              <div key={equation._key} className="my-4">
                <span
                  dangerouslySetInnerHTML={{
                    __html: katex.renderToString(equation.body, {
                      throwOnError: false,
                    }),
                  }}
                />
              </div>
            )
          } else if (equation._type === 'block') {
            return (
              <div key={equation._key} className="my-4">
                {equation.children.map((child: any) => {
                  if (child._type === 'span') {
                    return <span key={child._key}>{child.text}</span>
                  } else if (child._type === 'latex') {
                    return (
                      <span
                        key={child._key}
                        dangerouslySetInnerHTML={{
                          __html: katex.renderToString(child.body, {
                            throwOnError: false,
                          }),
                        }}
                      />
                    )
                  }
                  return null
                })}
              </div>
            )
          }
          return null
        }

        return (
          <div>{value?.equation?.map((item: any) => renderEquation(item))}</div>
        )
      },
    },
  }

  return <PortableText components={components} value={value} />
}
