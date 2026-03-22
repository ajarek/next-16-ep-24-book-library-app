import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Navbar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "sonner"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Biblioteka Cyfrowa",
  description: "Twoja cyfrowa biblioteka",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TooltipProvider>
    <html
      lang='pl'
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        spaceGrotesk.variable,

      )}
    >
      <body className='min-h-full flex flex-col' suppressHydrationWarning>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <Toaster position="top-right" richColors />
      </body>
    </html>
    </TooltipProvider>
  )
}
