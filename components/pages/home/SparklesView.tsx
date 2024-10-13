'use client'
import React, { useState, useEffect } from 'react'

import { SparklesCore } from '@/components/ui/sparkles'
import { Button } from '@/components/ui/button'

export function SparklesView() {
  const [showRinattok, setShowRinattok] = useState(true)

  // Effect to toggle between Rinattok21 and Get App button every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowRinattok((prev) => !prev)
    }, 5000) // Adjust timing as needed

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-[20rem] md:h-[30rem] lg:h-[40rem] gap-0 lg:gap-8 w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <Button
        className=" md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white z-20"
        size={'lg'}
        variant={'link'}
      >
        {showRinattok ? (
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 transition-opacity duration-5000 ease-in-out opacity-100">
            Rinattok2⬇
          </h1>
        ) : (
          <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 transition-opacity duration-5000 ease-in-out opacity-100">
            Get App
          </h1>
        )}
      </Button>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  )
}
