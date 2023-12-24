import { Inter } from 'next/font/google'
import '@radix-ui/themes/styles.css';
import './globals.css'
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import Navbar from './Navbar';


const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
 })

export const metadata = {
  title: 'track.me',
  description: 'Personalized finance managenement',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Theme appearance="light" accentColor="violet" radius="large">
          <Navbar children={children}/>
          {/* <main className='p-5'> */}
            {/* <Container> */}
              {/* {children} */}
            {/* </Container> */}
          {/* </main> */}
          {/* <ThemePanel/> */}
        </Theme>
      </body>
    </html>
  )
}
