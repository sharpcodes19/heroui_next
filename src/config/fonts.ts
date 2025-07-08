import { Fira_Code as FontMono, Manrope as FontSans } from "next/font/google"

export const fontSans = FontSans({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})
