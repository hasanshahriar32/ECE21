import { DoubleArrowLeftIcon, Share1Icon } from '@radix-ui/react-icons'
import type { NextPage } from "next";
import Head from "next/head";
import Image from 'next/image';
import Link from "next/link";

import Gallery from "@/components/pages/project/Gallery";
import { loadProject } from "@/sanity/loader/loadQuery";

import Bridge from "../../../../../components/Icons/Bridge";
import Logo from "../../../../../components/Icons/Logo";


type Props = {
  params: { slug: string }
}

const Home: NextPage = async ({ params }: Props,) => {
  const initial = await loadProject(params.slug)
  const currentURL = `https://ece21.vercel.app/projects/${params.slug}/gallery`
  const handleSocialShare = (socialPlatform: any) => {
    // Replace this with your custom share functionality
    navigator?.share({
      title: 'HKD Blog',
      text: currentURL,
    })
  }

  return (
    <>
      <Head>
        <title>Rinattok21: Images</title>
        <meta
          property="og:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
        <meta
          name="twitter:image"
          content="https://nextjsconf-pics.vercel.app/og-image.png"
        />
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          <div className="after:content border-spacing-2 border relative mb-5 flex h-[540px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/90 px-6 pb-16 pt-64 text-center shadow-highlight after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight lg:pt-0">
            <a
              className="pointer z-10 rounded-lg border absolute top-2 left-2 border-black hover:bg-black px-3 py-2 text-sm font-semibold hover:text-white transition bg-black/10 text-black md:mt-4"
              href={`/projects/${params.slug}`}
              rel="noreferrer"
            >
              <div className="flex group flex-row gap-2 items-center justify-between">
                <DoubleArrowLeftIcon className=" group-hover:translate-x-[-5px] transition-transform" />
                <span className=" group-hover:translate-x-[-5px] transition-transform">
                  Return
                </span>
              </div>
            </a>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span className="flex relative bottom-20 px-2 max-h-full max-w-full items-center justify-center">
                <Bridge />
              </span>
              <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
            </div>
            {/* <Logo /> */}
            <div className="">
              <Image
                src="/logo.jpg"
                width={120}
                className=""
                height={120}
                alt=""
              />
            </div>
            <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
              {initial?.data?.title || 'Rinattok21: Images'}
            </h1>
            <p className="max-w-[40ch] font-extralight text-xs md:text-base text-black/75 sm:max-w-[32ch]">
              {
                'A collection of images from Rinattok21. Please enjoy the images and share them with your friends.'
              }
            </p>
            <a
              className="pointer z-0 mt-6 rounded-lg border border-black bg-black px-3 py-2 text-sm font-semibold text-white transition hover:bg-black/10 hover:text-black md:mt-4"
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`}
              target="_blank"
              rel="noreferrer"
            >
              Share on FB <Share1Icon className="inline-block ml-1" />
            </a>
          </div>
          <Gallery data={initial?.data} />
        </div>
      </main>
      <footer className="p-6 text-center text-white/80 sm:p-12">
        Thank you to{' '}
        <a
          href="https://edelsonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Josh Edelson
        </a>
        ,{' '}
        <a
          href="https://www.newrevmedia.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Jenny Morgan
        </a>
        , and{' '}
        <a
          href="https://www.garysextonphotography.com/"
          target="_blank"
          className="font-semibold hover:text-white"
          rel="noreferrer"
        >
          Gary Sexton
        </a>{' '}
        for the pictures.
      </footer>
    </>
  )
}

export default Home;

