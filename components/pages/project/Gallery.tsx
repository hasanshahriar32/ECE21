"use client";
import Image from 'next/image';
import React from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view'

import getBase64ImageUrl from '@/utils/generateBlurPlaceholder';
const Gallery = ({data}:any) => {
    const images = data?.cloudinaryList;
    console.log(images);
    return (
      <div>
        <PhotoProvider
          toolbarRender={({ onScale, scale, rotate, onRotate }) => {
            return (
              <>
                <button onClick={() => onScale(scale + 1)}>zoom</button>
                <svg
                  className="PhotoView-Slider__toolbarIcon"
                  onClick={() => onScale(scale - 1)}
                />
                <svg
                  className="PhotoView-Slider__toolbarIcon"
                  onClick={() => onRotate(rotate + 90)}
                />
              </>
            )
          }}
        >
          {images?.map(async ({ id, public_id, format, url }) => (
            <div
              key={id}
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <div className="foo">
                <PhotoView
                  key={id}
                  src={`${url}`}
                >
                  <Image
                    alt="Next.js Conf photo"
                    className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                    style={{ transform: 'translate3d(0, 0, 0)' }}
                    placeholder="blur"
                    //   blurDataURL={await getBase64ImageUrl({ public_id, format })}
                    blurDataURL="https://res.cloudinary.com/rinattok21/image/upload/c_scale,w_8,q_70/v1635730000/nextjsconf-pics/1.jpg"
                    src={`${url}`}
                    width={720}
                    height={480}
                    sizes="(max-width: 640px) 100vw,
              (max-width: 1280px) 50vw,
              (max-width: 1536px) 33vw,
              25vw"
                  />
                </PhotoView>
              </div>
            </div>
          ))}
        </PhotoProvider>
      </div>
    )
};

export default Gallery;