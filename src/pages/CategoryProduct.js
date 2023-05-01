import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import {   toast } from 'react-hot-toast';
import { useCart } from '../context/cart';

const CategoryProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [products, setProducts]= useState()
    const [category, setCategory] = useState()
    const [cart, setCart] = useCart()

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

       <h4 className='text-center mt-3'>Category Name: {category?.name}</h4>
       <h4 className='text-center '>Result Found: {products?.length} </h4>
       <div className="row">
       <div className="d-flex flex-wrap">
              {
                  products?.map(product =>(
                      <div className="card m-2" key={product._id} style={{width: "18rem"}}>
                          <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt=''/>
                          <div className="card-body">
                              <h5 className="card-title">{product.name}</h5>
                              <p className="card-text">{product.description.substring(0, 30)}...</p>
                              <h5 className="card-text">$: {product.price}</h5>
                              <button  className="btn btn-primary ms-1" onClick={()=> navigate(`/product/${product.slug}`)}>More Detail</button>
                              <button  className="btn btn-secondary ms-1"
                               onClick={()=> {setCart([...cart, product])
                                localStorage.setItem("cart", JSON.stringify([...cart, product]))
                                toast.success("Item add to cart")
                              }}
                               >Add To cart</button>
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