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

  
  return <main className={'flex flex-col w-full h-full min-h-[100vh] ' + font.className}>
    <Navbar
      showSearch={showSearch}
    />
    <div className="flex flex-col w-full h-full gap-20 pb-6 overflow-x-hidden overflow-y-auto" ref={ref}>
      {children}
    </div>
    <footer className='justify-center w-full p-4 mt-auto text-xs text-center text-white/20 bg-secondary-darker'>
        <strong>2023 Strikr.gg</strong> isn&apos;t endorsed by Odyssey Interactive and does not reflect the views or opinions of Odyssey Interactive or anyone officially involved in producing or managing Omega Strikers.<br />
        Omega Strikers and Odyssey Interactive are trademarks or registered trademarks of Odyssey Interactive.
    </footer>
  </main>
}

export default GeneralLayout
