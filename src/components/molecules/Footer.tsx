'use client'

import Link from 'next/link'
import Logo from '../atoms/Logo'

export default function Footer() {
    return <footer
      className='flex flex-col py-8 px-8 text-subtle gap-4 mt-20'
    >
      <Logo size='md' type='full' />
      <p className='whitespace-pre-line leading-tight'>
        {/* {'disclaimer'} */}
        Strikr.pro isn&apos;t endorsed by Odyssey Interactive and does not reflect the views or opinions of Odyssey Interactive or anyone officially involved in producing or managing Omega Strikers.<br />
        Omega Strikers and Odyssey Interactive are trademarks or registered trademarks of Odyssey Interactive. 
      </p>
      <p>
        Strikr.pro © 2024
      </p>
      <ul className='flex gap-8 text-white font-semibold mt-4'>
        <li><Link href='https://lukimana.moe'>Contact the developers</Link></li>
        <li><Link href='https://lukimana.moe/posts/strikr.pro-faq/#who-is-currently-working-on-strikrpro'>FAQ</Link></li>
      </ul>
    </footer>
}
