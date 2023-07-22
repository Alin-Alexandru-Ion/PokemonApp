import React from 'react'

export default function Pagination({ accessNextPage, accessPrevPage }) {
  return (
    <div>
        { accessPrevPage && <button onClick={accessPrevPage}>Previous</button> }
        { accessNextPage && <button onClick={accessNextPage}>Next</button> }
    </div>
  )
}
