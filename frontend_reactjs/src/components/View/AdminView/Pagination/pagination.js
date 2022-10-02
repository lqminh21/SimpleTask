
import React, { useEffect, useMemo, useState } from "react"
import {Pagination} from "semantic-ui-react"
function usePagination ({books, setListDisplayBooks, currentPage, setCurrentPage}){
    
    let booksPerPage = 5
    let pageMax = Math.ceil(books.length / booksPerPage)
    function currentBooks(){
        let begin = (currentPage - 1) * booksPerPage
        let end = begin + booksPerPage

        return books.slice(begin,end)
    }
    
    function jump(p){
        let pageNumber = p > 1 ? p : 1
        setCurrentPage(pageNumber < pageMax ? pageNumber : pageMax)
    }

    const handleChange = (e, {activePage}) => {
        jump(activePage)

    }

    useEffect(() => {
        setListDisplayBooks(currentBooks)
    },[currentPage])

    return (
        <Pagination
            activePage={currentPage}
            totalPages={pageMax}
            onPageChange={handleChange}
        >
        </Pagination>
    )
}

export default usePagination
