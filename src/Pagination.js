import React from 'react'
import PropTypes from 'prop-types';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function Pagination({ accessNextPage, accessPrevPage, fadeOut, fadeIn }) {
  return (
    <div className={fadeOut ? `fade-out` : null}>
      <div id="button-group" className={fadeIn ? `fade-in` : null}>
          { accessPrevPage && <button id="button" onClick={accessPrevPage}>
            <ArrowBackIcon fontSize='10'></ArrowBackIcon>
          </button> }

          { accessNextPage && <button id="button" onClick={accessNextPage}>
            <ArrowForwardIcon fontSize='30'></ArrowForwardIcon>
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