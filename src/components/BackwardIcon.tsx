import React, { useState } from 'react'
import './BackwardIcon.module.css'

const BackwardIcon = () => {
  const [storeBackwardIcon, setstoreBackwardIcon] = useState({})

  return (
    <svg
      viewBox='0 0 24 24'
      width={16}
      height={16}
      stroke='currentColor'
      strokeWidth={2}
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='css-i6dzq1'
    >
      <line x1={19} y1={12} x2={5} y2={12} />
      <polyline points='12 19 5 12 12 5' />
    </svg>
  )
}

export default BackwardIcon
