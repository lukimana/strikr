interface ContentLayoutProps {
  children?: React.ReactNode | React.ReactNode[]
}

const ContentLayout: React.FC<ContentLayoutProps> = ({ children }) => {
  return (
    <section
    className='flex flex-col gap-8 px-8 lg:px-20'
  >
    {children}
  </section>
  )
}

export default ContentLayout
