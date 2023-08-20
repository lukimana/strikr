'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react"

export default function Layout({children}: { children: React.ReactElement }) {
  const router = useRouter()

  useEffect(()=>{
    document.body.setAttribute('style', 'background: transparent !important;');
    setInterval(() => {
      router.refresh()
    }, 1000 * 60 * 3)
  }, [router])
  return <>{children}</>
}