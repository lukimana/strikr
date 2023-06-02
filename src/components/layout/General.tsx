import Navbar from '@/components/navbar'
import { useScroll } from 'framer-motion'
import { Inter } from 'next/font/google'
import { Router, useRouter } from 'next/router'
import { useRef, useState } from 'react'

const font = Inter({ subsets: ['latin'] })

interface IGeneralLayoutProps {
  children: React.ReactNode | React.ReactNode[]
}

const GeneralLayout: React.FunctionComponent<IGeneralLayoutProps> = ({ children }) => {
  const route = useRouter()
  const [showSearch, setShowSearch] = useState(route.asPath !== '/')
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

  
  return <main className={'flex flex-col w-full h-full pb-8 ' + font.className}>
    <Navbar
      showSearch={showSearch}
    />
    <div className="flex flex-col w-full h-full gap-20 overflow-x-hidden overflow-y-auto" ref={ref}>
      {children}
    </div>
  </main>
}

export default GeneralLayout
