import Link from 'next/link'
import { navbarLinksList } from './Navbar'

interface FooterProps {

}

const Footer: React.FC<FooterProps> = () => {
  return <footer className='relative py-12 flex bg-secondary overflow-hidden md:py-12 px-20 w-full mt-20 z-[1]'>
    <div className='relative z-[2] w-full'>
      <div className='flex flex-wrap justify-between md:flex-nowrap w-full flex-col items-center gap-20'>
          <div className='w-full md:w-1/2 flex justify-center text-gray-300 md:justify-start'>
              <ul className='list-inside space-y-8 text-center md:text-left'>
                {navbarLinksList.map( (link) => {
                  return <li key={`footer.${link.href}`}><Link href={link.href}>{link.name}</Link></li>
                } )}
              </ul>
          </div>
          <div className='w-full md:w-1/2 space-y-6 text-center sm:text-left'>
              <span className='block text-gray-300'>
                <strong>Strikr.gg</strong> isn&apos;t endorsed by Odyssey Interactive and does not reflect the views or opinions of Odyssey Interactive or anyone officially involved in producing or managing Omega Strikers.<br />
                Omega Strikers and Odyssey Interactive are trademarks or registered trademarks of Odyssey Interactive.
              </span>

              <span className='block text-gray-300'>Strikr &copy; 2023</span>

              <span className='flex justify-between text-white'> 
                  <a href='https://api.strikr.gg' className='font-semibold'>API</a>
                  <a href='https://discord.com/users/175314117924487168' className='font-semibold'>Contact</a> 
              </span>
          </div>
      </div>
    </div>
    <div aria-hidden='true' className='absolute h-full inset-0 flex items-center'>
        <div aria-hidden='true' className='bg-layers bg-scale w-56 h-56 m-auto blur-xl bg-gradient-to-r from-tertiary to-tertiary rounded-full md:w-[30rem] md:h-[30rem] md:blur-3xl'></div>
    </div>
    <div aria-hidden='true' className='absolute inset-0 w-full h-full bg-secondary opacity-80'></div>
  </footer>
}

export default Footer
