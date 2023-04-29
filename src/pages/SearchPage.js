import React from 'react'
import Layout from '../components/Layout'
import { useSearch } from '../context/search'

const SearchPage = () => {

    const [values, setValues] = useSearch();
  return (
    <Layout title={"Search Result"}>
        <div className="container">
            <div className="text-center">
                <h1>Search Result</h1>
                <h6>{values?.result.length < 1 ? "No product found" : ` Found ${ values?.result.length}`}</h6>
                <div className="d-flex flex-wrap">
              {
                  values?.result.map(product =>(
                      <div className="card m-2" style={{width: "18rem"}}>
                          <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt=''/>
                          <div class="card-body">
                              <h5 className="card-title">{product.name}</h5>
                              <p className="card-text">{product.description.substring(0, 30)}...</p>
                              <h5 className="card-text">$: {product.price}</h5>
                              <button href="#" class="btn btn-primary ms-1">More Detail</button>
                              <button href="#" class="btn btn-secondary ms-1">Add To cart</button>
                          </div>
                      </div> 
                  ))
              }
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default SearchPage