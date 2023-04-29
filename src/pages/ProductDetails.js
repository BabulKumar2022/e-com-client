import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const ProductDetails = () => {
const params = useParams();
const [product, setProduct] = useState({});
const [relatedProducts, setRelatedProducts] = useState([])


  useEffect(() =>{
    if(params?.slug)getProductDetail()
  },[params?.slug])

  //=========get product ===============
    const getProductDetail = async () =>{
      try {
        const {data}= await axios.get(`http://localhost:8000/api/v1/product/get-product/${params.slug}`)
        setProduct(data?.product);
        getSimilarProduct(data?.product._id, data?.product.category)
      } catch (error) {
        console.log(error) 
      }
    }
    //======get similar product============
    const getSimilarProduct = async (pid, cid) =>{
      try {
        const {data} = await axios.get(`http://localhost:8000/api/v1/product/related-product/${pid}/${cid}`)
       console.log(data)
        setRelatedProducts(data?.product)
      } catch (error) {
        console.log(error)
        
      }
    }
  return (
    <Layout title={"Product details"}>
        <div className="row container mt-2">
          <div className="col-md-6">
              <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`}
               alt={product.name} className='card-img-top' />
          </div>
          <div className="col-md-6">
          <h1 className="text-center">Details</h1>
          <h5> <span  className=''>Name:</span> {product.name}</h5>
          <h5>Description: {product.description}</h5>
          <h5>Category: {product.category}</h5>
          <h5>Price: {product.price}</h5>
          <button  class="btn btn-secondary ms-1">Add To cart</button>

          </div>
        </div>
        <div className="row container">
          <h1>RELATED PRODUCT</h1>
            {JSON.stringify(relatedProducts, null, 4)}
        </div>

    </Layout>
  )
}

export default ProductDetails