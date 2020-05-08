import React from 'react'

const Error = ({error}) => (
  <div>
    <h1>Whoops</h1>
    <p>{`Sorry, something went wrong. We're looking into it.`}</p>
    <div style={{fontFamily: 'monospace'}}>{error ? error.message : null}</div>
  </div>
)

export default Error
