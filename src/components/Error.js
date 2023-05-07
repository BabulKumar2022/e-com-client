import React from 'react'
import { Alert } from 'bootstrap'



const Error = ({error}) => {
  return <Alert variant={"danger"}> {error}</Alert>
}

export default Error