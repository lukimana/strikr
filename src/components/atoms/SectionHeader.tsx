interface SectionHeaderProps {
  title: string
  children?: React.ReactNode
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, children }) => {
  return <div className='w-full justify-between items-center flex'>
    <h3 
      className='flex items-center justify-between text-lg font-semibold'
    >
      {title}
    </h3>
    {children}
  </div>
}

export default SectionHeader
