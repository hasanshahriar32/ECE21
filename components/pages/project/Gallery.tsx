'use client'
import {
  DownloadIcon,
  RotateCounterClockwiseIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from '@radix-ui/react-icons'
import Image from 'next/image'
import React, { useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view'

import { Button } from '@/components/ui/button'
import downloadPhoto from '@/utils/downloadPhoto'

const Gallery = ({ data }: any) => {
  const images = data?.cloudinaryList
  const [activeImage, setActiveImage] = useState<any>(null)

  return (
    <div>
      <PhotoProvider
      onIndexChange={(index) => setActiveImage(images[index])}
        toolbarRender={({ onScale, scale, rotate, onRotate }) => {
          return (
            <>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => onScale(scale + 1)}
              >
                <ZoomInIcon />
              </Button>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => onScale(scale - 1)}
              >
                <ZoomOutIcon />
              </Button>

              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => onRotate(rotate + 90)}
              >
                <RotateCounterClockwiseIcon />
              </Button>
              <Button
                size={'icon'}
                variant={'ghost'}
                onClick={() => {
                  if (activeImage) {
                    downloadPhoto(activeImage?.url, `${activeImage?.public_id}.${activeImage?.format}`)
                  }
                }}
              >
                <DownloadIcon />
              </Button>
            </>
          )
        }}
      >
        {images?.map(({ id, public_id, format, url }: any) => (
          <div
            key={id}
            className="group relative mb-5 block w-full cursor-zoom-in"
            >
            <PhotoView
              key={id}
              src={url}
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                placeholder="blur"
                blurDataURL="https://res.cloudinary.com/rinattok21/image/upload/c_scale,w_8,q_70/v1635730000/nextjsconf-pics/1.jpg"
                src={url}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
              />
            </PhotoView>
          </div>
        ))}
      </PhotoProvider>
    </div>
  )
}

export default Gallery
