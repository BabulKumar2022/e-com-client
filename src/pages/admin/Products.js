import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([]);

    //==========get all products======================
    const getAllProducts = async(p)=>{
        try {
            const {data} = await axios.get('http://localhost:8000/api/v1/product/get-product')
                setProducts(data.products)
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    //lifecycle method============
    useEffect(()=>{
        getAllProducts()
    },[])

  return (
    <Layout title={"Product"}>
        <div className="container-fluid m-3 p-3">
            <h1 className='text-center'>AdminDashboard </h1>  
            <hr/>
            <div className="row">
                <div className="col-md-3"><AdminMenu/></div>
                <div className="col-md-9 ">
                    <h1 className='text-center'>All Products List </h1>
                    <div className="d-flex">
                    {
                        products.map(product =>(
                            <Link key={product._id} to={`/dashboard/admin/product/${product.slug}`} className='product-link'>
                                <div className="card m-2" style={{width: "18rem"}}>
                                <img src={`http://localhost:8000/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt=''/>
                                <div class="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                            </div>
                            </Link>
                        ))
                    }
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products