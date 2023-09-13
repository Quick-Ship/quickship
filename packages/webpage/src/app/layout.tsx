import { Nabvar,Footer } from '@/components'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='flex flex-col min-h-screen'>
        <Nabvar></Nabvar>
        {children}
        <Footer></Footer>
        </body>
    </html>
    
  )
}
