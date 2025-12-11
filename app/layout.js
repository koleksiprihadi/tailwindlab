import './globals.css'

export const metadata = {
  title: 'Tailwind CSS Builder',
  description: 'Tool interaktif untuk membangun Tailwind CSS classes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
      
    </html>
  )
}