import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
  
    <Layout title={'Page not found'}>
      <div className="pnf">
        <h1 className='pnf-title'>404</h1>
        <h1 className='pnf-heading'>Page Not Found</h1> 
        <Link to="/" className='pnf-btn'>GO BACK</Link>
      </div>
      
    </Layout>
  )
}

export default NotFound