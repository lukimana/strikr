interface IEsportsSectionProps {
}

const EsportsSection: React.FunctionComponent<IEsportsSectionProps> = (props) => {
  return <section
    className='flex flex-col gap-8 px-8 sm:px-20'
  >
    <h3 
      className='text-lg font-semibold'
    >
      E-Sports
    </h3>
  </section>
}

export default EsportsSection
