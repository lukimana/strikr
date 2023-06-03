import awakenings from '@/core/relations/awakeningRotation.json'
import AwakeninBlock from '../awakening/Block'
import { useAtom } from 'jotai'
import { preferenceShowAwakeningRotation } from '@/core/stores/userPreference'
import { Eye, EyeClosed, EyeSlash } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

interface IAwakeningsTotationProps {
}

const AwakeningsRotationSection: React.FunctionComponent<IAwakeningsTotationProps> = (props) => {
  const [showRotation, setShowRotation] = useAtom(preferenceShowAwakeningRotation)

  return <section
    className='flex flex-col gap-8 px-8 sm:px-20'
  >
    <h3 
      className='flex items-center justify-between text-lg font-semibold'
    >
      Awakenings Rotation
      <button
        className={`flex items-center gap-2 text-sm font-medium duration-300 text-subtle ${showRotation ? 'hover:text-loss': 'hover:text-win'}`}
        onClick={()=> {
          setShowRotation(!showRotation)
        }}
      >
        { showRotation ? 'Hide' : 'Show'} {showRotation ? <EyeSlash /> : <Eye />}
      </button>
    </h3>
    <AnimatePresence>
      {showRotation ? (
        <motion.div 
          className='grid w-full grid-cols-4 gap-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12'
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            height: 0
          }}
          transition={{
            duration: 0.2,
            bounce: false,
            ease: 'easeOut'
          }}
        >
          {awakenings.sort().map( awakening => {
            return <AwakeninBlock id={awakening} key={awakening}/>
          })}
        </motion.div>
      ) : (
        <div className='flex items-center justify-center px-8 py-4 rounded-lg'>
          <span className='flex items-center gap-4 text-sm text-subtle/60'>Hidden <EyeSlash /></span>
        </div>
      )}
    </AnimatePresence>
  </section>
}

export default AwakeningsRotationSection
