'use client'

import { type QueryResponseInitial } from '@sanity/react-loader'

import { homePageQuery, ladderQuery } from '@/sanity/lib/queries'
import { useQuery } from '@/sanity/loader/useQuery'
import { HomePagePayload, LadderPayload } from '@/types'

import HomePage from './HomePage'

type Props = {
  initial: QueryResponseInitial<HomePagePayload | null>
  initial1: QueryResponseInitial<LadderPayload | null>
}

export default function HomePagePreview(props: Props) {
  const { initial, initial1 } = props

  // Using distinct variable names to avoid conflicts
  const { data: homeData, encodeDataAttribute: encodeHomeData } =
    useQuery<HomePagePayload | null>(homePageQuery, {}, { initial })

  const { data: ladderData, encodeDataAttribute: encodeLadderData } =
    useQuery<LadderPayload | null>(ladderQuery, {}, { initial: initial1 })

  if (!homeData) {
    return (
      <div className="text-center">
        Please start editing your Home document to see the preview!
      </div>
    )
  }

  if (!ladderData) {
    return (
      <div className="text-center">
        Please start editing your Ladder document to see the preview!
      </div>
    )
  }

  return (
    <HomePage
      data={homeData}
      data1={ladderData}
      data2={undefined}
      encodeDataAttribute={encodeHomeData}
      encodeDataAttribute1={encodeLadderData}
    />
  )
}
