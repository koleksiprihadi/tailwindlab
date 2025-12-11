import { icons } from 'lucide-react'
import './globals.css'

export const metadata = {
  title: 'Tailwind CSS Builder',
  description: 'Tool interaktif untuk membangun Tailwind CSS classes',
  icons: 'https://teknomaven.com/logo.png'
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
      
    </html>
  )
}