import type { PortableTextBlock } from 'next-sanity'

import { CustomPortableText } from '@/components//shared/CustomPortableText'
import type { SettingsPayload } from '@/types'
import GTranslate from './gTranslate'
import ChatWidget from '@/components/shared/ChatWidget'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  return (
    <footer className="bottom-0 w-full bg-white py-12 text-center md:py-20">
      {footer && (
        <CustomPortableText
          paragraphClasses="text-md md:text-xl"
          value={footer}
        />
      )}
      <div className="flex w-full flex-row flex-wrap items-center justify-center">
        <GTranslate />
        <ChatWidget />
      </div>
    </footer>
  )
}
