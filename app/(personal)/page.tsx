import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import Link from 'next/link'

import { HomePage } from '@/components/pages/home/HomePage'
import { studioUrl } from '@/sanity/lib/api'
import { loadAllProject,loadHomePage, loadLadder } from '@/sanity/loader/loadQuery'
const HomePagePreview = dynamic(
  () => import('@/components/pages/home/HomePagePreview'),
)

export default async function IndexRoute() {
  const initial = await loadHomePage()
  const initial1 = await loadLadder()
  const page = 1 // specify the desired page number
  const limit = 100 // specify the number of items per page
  const initial2 = await loadAllProject(page, limit)

  if (draftMode().isEnabled) {
    return <HomePagePreview initial={initial} initial1={initial1} />
  }

  if (!initial.data) {
    return (
      <div className="text-center">
        You don&rsquo;t have a homepage yet,{' '}
        <Link href={`${studioUrl}/structure/home`} className="underline">
          create one now
        </Link>
        !
      </div>
    )
  }

  return <HomePage data2={initial2?.data} data1={initial1.data} data={initial.data} />
}
