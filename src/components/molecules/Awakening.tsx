import AwakeningTooltip from '@/atoms/AwakeningTooltip'
import AwakeninBlock from '../atoms/AwakeningBlock'

interface AwakeningProps {
  id: string
}

const Awakening: React.FC<AwakeningProps> = ({ id }) => {
  return <AwakeningTooltip id={id}>
    <AwakeninBlock id={id} />
  </AwakeningTooltip>
}

export default Awakening
