import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { FloatingTopNav } from "@/components/floating-nav"
import { ThemeProvider } from "@/components/theme-provider"
import { TransitionProvider } from "@/context/transition-context";
import { PageBlurTransition } from "@/components/page-blur-transition"

import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
})

export const metadata: Metadata = {
  title: "raj-codes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <TransitionProvider>
              <PageBlurTransition />
              
              <FloatingTopNav />
              {children}
              <Footer />
            </TransitionProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}