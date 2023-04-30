import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../components/hooks/useCategory'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={"all Categories"}>
        <div className="container">
            <div className="row">
                <h1>All Categories</h1>
                {
                categories.map((c) =>(
                    <div key={c._id} className="col-md-6 mt-5 mb-3 gy-3 gx-3">
                      <Link to={`/category/${c.slug}`} className='bnt btn-primary p-3'>{c.name}</Link>
                    </div>
                ))
                }
            </div>
        </div>
    </Layout>
  )
}

export default Categories