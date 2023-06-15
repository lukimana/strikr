import clsx from 'clsx'
import { getRankFromLP } from '@/core/relations/resolver'

interface EloBadgeProps {
  lp: number;
  size?: 'sm' | 'md' | 'lg';
}

const EloBadge: React.FC<EloBadgeProps> = ({ lp, size }) => {
  const elo = getRankFromLP(lp)
  
  return <div 
    className={clsx(
      'bg-center bg-contain aspect-square',
      {
        'w-8': size === 'sm',
        'w-12': size === 'md',
        'w-16': size === 'lg',
      }
    )}
    style={{
      backgroundImage: `url('${elo.rankObject.image}')`
    }}
  >

  </div>
}

export default EloBadge
