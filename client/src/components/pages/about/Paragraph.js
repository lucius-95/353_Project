import React from 'react'

function Paragraph({ header, first }) {
  return (
    <div className="block">
      <p>
        <div className="header-line">{header}</div>
      </p>
      <p className="line-break margin-top-10" />
      <p className="margin-top-10">{first}</p>
    </div>
  )
}

export default Paragraph
