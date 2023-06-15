import awakenings from '@/core/relations/objects/awakeningRotation'
import AwakeninBlock from '../atoms/AwakeningBlock'
import { useAtom } from 'jotai'
import { preferenceShowAwakeningRotation } from '@/core/stores/userPreference'
import { Eye, EyeClosed, EyeSlash } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeader from '@/atoms/SectionHeader'
import Button from '@/atoms/Button'
import ContentLayout from '@/components/layouts/Content'

interface IAwakeningsTotationProps {
}

const AwakeningsRotationSection: React.FunctionComponent<IAwakeningsTotationProps> = (props) => {
  const [showRotation, setShowRotation] = useAtom(preferenceShowAwakeningRotation)

  return <ContentLayout>
    <SectionHeader
      title='Awakening Rotation'
    >
      
      <Button
        backgroundHoverColor='accent'
        textHovercolor='primary'
        size='xs'
        className='flex gap-4'
        onClick={()=> {
          setShowRotation(!showRotation)
        }}
      >
        { showRotation ? 'Hide' : 'Show'} {showRotation ? <EyeSlash /> : <Eye />}
      </Button>
    </SectionHeader>
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
          {[...awakenings].sort().map( awakening => {
            return <AwakeninBlock id={awakening} key={awakening}/>
          })}
        </motion.div>
      ) : (
        <div className='flex items-center justify-center px-8 py-4 rounded-lg bg-secondary/30'>
          <span className='flex items-center gap-4 text-sm text-subtle/60'>Press show to display <EyeSlash /></span>
        </div>
      )}
    </AnimatePresence>
  </ContentLayout>
}

export default AwakeningsRotationSection
