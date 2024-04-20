import React from 'react'

const ExpandIcon = (props: {}) => {
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
      {...props}
    >
      <path d='M15 3L21 3 21 9' />
      <path d='M9 21L3 21 3 15' />
      <path d='M21 3L14 10' />
      <path d='M3 21L10 14' />
    </svg>
  )
}

export default ExpandIcon
