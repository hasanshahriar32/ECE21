import Link from 'next/link'

import { MenuItem, SettingsPayload } from '@/types'

import PageSelection from './PageSelection'
// import { FloatingNavbar } from "./FloatingNav";
interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  // console.log(data);
  return (
    <div className="sticky justify-between top-0 z-50 flex w-full flex-wrap items-center gap-x-5 bg-white/80 px-4 py-4 backdrop-blur md:px-16 md:py-5 lg:px-32">
      <div className="flex flex-row">
        <Link
          className="text-lg font-extrabold hover:text-black md:text-xl mr-3"
          href="/"
        >
          ঋণাত্মক-২১
        </Link>
        <Link
          className="hidden md:block text-lg text-gray-600 md:text-xl"
          href="/studio/structure"
        >
          Studio
        </Link>
      </div>
      <PageSelection menuItems={menuItems} />
      {/* <FloatingNavbar /> */}
    </div>
  )
}
