import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagination({ accessNextPage, accessPrevPage }) {
  return (
    <div class="button-group">

        { accessPrevPage && <button id="prev-button" class="button" onClick={accessPrevPage}>
          <ArrowBackIcon></ArrowBackIcon>
        </button> }

        { accessNextPage && <button id="next-button" class="button" onClick={accessNextPage}>
          <ArrowForwardIcon></ArrowForwardIcon>
        </button> }
    </div>
  )
}
