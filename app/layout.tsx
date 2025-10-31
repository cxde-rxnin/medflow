'use client'
import type React from "react"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

const geistSans = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} bg-background text-foreground`}>
        <SessionProvider>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
