import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap"

const PaginationComp = ({
    page,
    setPage,
    totalItems,
    itemsPerPage
}) => {
    const [layoutPages, setLayoutPages] = useState(<></>)
    const [lastPage, setLastPage] = useState(0)

    useEffect(() => {
        setLastPage(Math.ceil((totalItems / itemsPerPage)))
        // eslint-disable-next-line
    }, [page, totalItems, itemsPerPage])

    useEffect(() => {
        listPages()
        // eslint-disable-next-line
    }, [lastPage])

    const pagePrev = (e) => {
        e.preventDefault()
        if (page > 1) {
            setPage(1)
        }
    }

    const nextPage = (e) => {
        e.preventDefault()
        if (lastPage > page) {
            setPage(lastPage)
        }
    }

    const changePage = (e, newPage) => {
        e.preventDefault()
        if (page !== newPage) {
            setPage(newPage)
        }
    }

    const listPages = () => {
        if (lastPage > 0) {
            let pages = <></>
            const first = (page - 2) < 1 ? 1 : (page - 2)
            const last = (page + 2) >= lastPage ? lastPage : (page + 2)

            for (let i = 0; i < last; i++) {
                pages = <>
                    {pages}
                    {(i + first) <= lastPage && <PaginationItem className={page === i + first ? "active" : ""} key={i + first}>
                        <PaginationLink
                            href="#"
                            onClick={e => changePage(e, i + first)}
                        >
                            {i + first}
                        </PaginationLink>
                    </PaginationItem>}
                </>
            }
            setLayoutPages(pages)
        } else {
            setLayoutPages(<></>)
        }
    }

    if (lastPage > 0) {
        return (
            <>
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >
                        <PaginationItem className={page === 1 ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => pagePrev(e)}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-double-left" />
                                <span className="sr-only">Primero</span>
                            </PaginationLink>
                        </PaginationItem>

                        {layoutPages}

                        <PaginationItem className={page === lastPage ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => nextPage(e)}
                            >
                                <i className="fas fa-angle-double-right" />
                                <span className="sr-only">Último</span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </nav>
            </>
        )
    } else {
        return null
    }

}

export default PaginationComp