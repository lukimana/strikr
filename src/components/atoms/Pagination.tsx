'use client'

import clsx from "clsx"

interface PaginationProps {
  totalItems: number
  itemsPerPage: number
  currentPage: number
}

export const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, currentPage }) => {

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const prevPage =  Math.max(currentPage - 1, 0)
  const nextPage = Math.min(currentPage + 1, 199)

  const handlePreviousPage = () => {
    const urlParams = new URLSearchParams(
      window.location.search
    )

    urlParams.set('page',  prevPage.toString())
    window.location.search = urlParams.toString()
  }

  const handleNextPage = () => {
    const urlParams = new URLSearchParams(
      window.location.search
    )

    urlParams.set('page',  nextPage.toString())
    window.location.search = urlParams.toString()
  }

  const handlePageClick = (page: number) => {
    const urlParams = new URLSearchParams(
      window.location.search
    )

    urlParams.set('page',  page.toString())
    window.location.search = urlParams.toString()
  }

  const getPageNumbers = (): number[] => {
    const pageNumbers = []

    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      let startPage = Math.max(currentPage - 2, 0)
      let endPage = Math.min(startPage + 4, totalPages - 1)

      if (endPage - startPage < 4) {
        startPage = Math.max(endPage - 4, 0)
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }
    }

    return pageNumbers
  }

  return (
    <nav className="flex items-center justify-between pt-8" aria-label="Table navigation">
      <span className="text-sm font-normal text-subtle">
        Showing{' '}
        <span className="font-semibold">
          {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, totalItems)}
        </span>{' '}
        of{' '}
        <span className="font-semibold">{totalItems}</span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8">
        <li>
          <div
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-l-lg bg-tertiary border border-secondary-border hover:bg-accent hover:text-primary-500 duration-200 cursor-pointer"
            onClick={handlePreviousPage}
          >
            Previous
          </div>
        </li>
        {getPageNumbers().map((pageNumber) => (
          <li key={pageNumber}>
            <div
              className={clsx(
                'flex items-center justify-center px-3 h-8 leading-tight border border-secondary-border cursor-pointer',
                {
                  'bg-tertiary hover:bg-accent hover:text-primary-500 duration-200': pageNumber !== currentPage,
                  'bg-accent text-primary-500': pageNumber === currentPage
                })
              }
              onClick={() => handlePageClick(pageNumber)}
            >
              {pageNumber + 1}
            </div>
          </li>
        ))}
        <li>
          <div
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight rounded-r-lg bg-tertiary border border-secondary-border hover:bg-accent hover:text-primary-500 duration-200 cursor-pointer"
            onClick={handleNextPage}
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  )
}