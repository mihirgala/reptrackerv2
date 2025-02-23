import type { Metadata } from "next"
import { Poppins as FontSans } from "next/font/google"
import "@/app/globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import { Provider as JotaiProvider } from "jotai"
import { siteConfig } from "@/config/site"
// import { GoogleAnalytics } from '@next/third-parties/google'

const fontSans = FontSans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "600", "800", "900"],
  variable: "--font-sans",
})

 
export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: `${siteConfig.name}`,
  },
  description: `${siteConfig.description}`,
  metadataBase: new URL(process.env.BASE_URL as string),
  keywords:[
    "Workout Tracking App",
    "Fitness Progress Tracker",
    "Exercise Logging Tool",
    "Gym Companion App",
    "Fitness Tracker",
    "Exercise Progress Tracker",
    "Workout Log App",
    "Fitness Journal",
    "Exercise Planner",
    "Fitness Goal Tracker",
    "AI Workout Planner",
    "Gym Progress Tracker",
    "Strength Training Log",
    "Workout Routine Tracker",
    "Personal Fitness Assistant",
    "AI-Powered Fitness App",
    "Custom Workout Planner",
    "Meal Plan Tracker",
    "Fitness Coaching App",
    "Gym Workout Logger"
  ],
  authors: [
    {
      name: "Mihir Gala",
      url: "https://mihircodes.me",
    },
  ],
  creator: "Mihir  Gala",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    creator: "@mihiirgala",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}


interface RootLayoutProps {
  children: React.ReactNode
}

const RootLayout = async ({ children }: RootLayoutProps) => {
  const session = await auth()
  return (
    <JotaiProvider>
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            "font-sans antialiased pb-5",
            fontSans.variable
          )}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string} />
      </html>
    </SessionProvider>
    </JotaiProvider>
  )
}

export default RootLayout