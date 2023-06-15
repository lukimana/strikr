import { useScroll } from 'framer-motion'
import { Inter } from 'next/font/google'
import { Router, useRouter } from 'next/router'
import { useRef, useState } from 'react'
import Navbar from '../molecules/Navbar'
import Footer from '../molecules/Footer'

const font = Inter({ subsets: ['latin'] })

interface IGeneralLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const GeneralLayout: React.FunctionComponent<IGeneralLayoutProps> = ({ children }) => {
  const route = useRouter()
  const [showSearch, setShowSearch] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    offset: ['128px', 'start'],
    target: ref
  })

  scrollYProgress.on('change', (e) =>{
    if (e > 0.5 && showSearch === true && route.asPath === '/') {
      setShowSearch(false)
    }
    if (e === 0 && showSearch === false) {
      setShowSearch(true)
    }
  })

  
  return <main className={'flex flex-col w-full h-full min-h-[100vh] ' + font.className}>
    <Navbar
      showSearch={showSearch}
    />
    <div className="flex flex-col w-full h-full gap-20 pb-6 overflow-x-hidden overflow-y-auto" ref={ref}>
      {children}
    </div>
    <Footer />
  </main>
}

export default GeneralLayout
