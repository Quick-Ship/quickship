import { Nabvar,Footer } from '@/components'
import './globals.css'


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>

        <Nabvar></Nabvar>
        {children}
        <Footer></Footer>
        </body>
    </html>
  )
}
