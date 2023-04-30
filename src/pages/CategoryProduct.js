import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [products, setProducts]= useState()
    const [category, setCategory] = useState()

    useEffect(()=>{
        if(params.slug)getProductByCat()
    },[params.slug])
    const getProductByCat = async()=>{
        try {
            const {data} = await axios.get(`http://localhost:8000/api/v1/product/product-category/${params.slug}`)
            setProducts(data?.products);
            setCategory(data?.category);
            console.log(data)
        } catch (error) {
            console.log(error)
            
        }
    }




  return (
    <Layout title={"category product"}>

       <h1 className='text-center bg-warning mt-3'>Category Name: {category?.name}</h1>
       <h1 className='text-center bg-warning'>Result Found: {products?.length} </h1>
       <div className="row">
       <div className="d-flex flex-wrap">
              {
                  products?.map(product =>(
                      <div className="card m-2" style={{width: "18rem"}}>
                          <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt=''/>
                          <div class="card-body">
                              <h5 className="card-title">{product.name}</h5>
                              <p className="card-text">{product.description.substring(0, 30)}...</p>
                              <h5 className="card-text">$: {product.price}</h5>
                              <button  class="btn btn-primary ms-1" onClick={()=> navigate(`/product/${product.slug}`)}>More Detail</button>
                              <button  class="btn btn-secondary ms-1">Add To cart</button>
                          </div>
                      </div> 
                  ))
              }
            </div>
       </div>
    </Layout>
  )
}

export default CategoryProduct