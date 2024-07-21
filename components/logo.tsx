import Image from 'next/image'
import FullLogo from '@/assets/logos/full.svg'
import { siteConfig } from '@/config/site'
import { Montserrat } from "next/font/google"
import { cn } from '@/lib/utils'
import Link from 'next/link'

const fontMontserrat = Montserrat({
  subsets: ["latin"],
  weight:["800"]
})
interface SiteLogoProps{
  asLink?: boolean
}
export const SiteLogo = ({asLink=false}:SiteLogoProps) => {
  if(asLink){
    return (
      <Link href={"/"} className='flex gap-1 justify-center items-center'>
        <Image className='dark:invert' src={FullLogo} alt="Logo" width={40} height={40} loading={"eager"} />
        <h1 className={cn('font-extrabold text-3xl tracking-tight',fontMontserrat.className)}>{siteConfig.name}</h1>
      </Link>
    )
  }
  return (
    <span className='flex gap-1 justify-center items-center'>
        <Image className='dark:invert' src={FullLogo} alt="Logo" width={40} height={40} loading={"eager"} />
        <h1 className={cn('font-extrabold text-3xl tracking-tight',fontMontserrat.className)}>{siteConfig.name}</h1>
    </span>
  )
}