import React from 'react'
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagination({ accessNextPage, accessPrevPage, fadeOut, fadeIn }) {
  return (
    <div className={fadeOut ? `fade-out` : null}>
      <div id="button-group" className={fadeIn ? `fade-in` : null}>
          { accessPrevPage && <button className='button' onClick={accessPrevPage}>
            <ArrowBackIcon id='back-arrow'></ArrowBackIcon>
          </button> }

          { accessNextPage && <button className='button' onClick={accessNextPage}>
            <ArrowForwardIcon id='next-arrow'></ArrowForwardIcon>
          </button> }
      </div>
    </div>
  )
}

Pagination.propTypes = {
  accessNextPage: PropTypes.func,
  accessPrevPage: PropTypes.func,
  fadeOut: PropTypes.bool,
  fadeIn: PropTypes.bool,
};