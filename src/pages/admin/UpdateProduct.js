import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';


const {Option} = Select;


const UpdateProduct = () => {


    const navigate = useNavigate();
    const params = useParams()
    const [id, setId]= useState()
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(" ")
    const [description, setDescription] = useState(" ")
    const [price, setPrice] = useState(" ")
    const [category, setCategory] = useState()
    const [quantity, setQuantity] = useState(" ")
    const [shipping, setShipping] = useState(" ")
    const [photo, setPhoto] = useState(" ")
  
  // ==================get single product=========================

  const getSingleProduct = async() =>{
    try {
        const {data} = await axios.get(`http://localhost:8000/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id)
        setPhoto(data.product.photo)
        setDescription(data.product.description)
        setPrice(data.product.price)
        setQuantity(data.product.quantity)
        setCategory(data.product.category._id)
        setShipping(data.product.shipping)
    } catch (error) {
        console.log(error)
        
    }
  }
  
        useEffect(()=>{
        getSingleProduct()
        },[])
  
      //==========get all category===========
      const getAllCategory = async()=>{
        try {
          const {data} = await axios.get('http://localhost:8000/api/v1/category/get-category')
          if(data?.success){
            setCategories(data?.category)
          }
        } catch (error) {
          console.log(error)
          toast.error('Something went wrong in getting category')
        }
    };
    useEffect(() =>{
      getAllCategory()
    },[])
  
  
    //===========update product handle=====================
  
    const handleUpdate = async(e)=>{
     
      e.preventDefault();
      try {
        const productData = new FormData()
        productData.append("name", name)
        productData.append("description", description)
        productData.append("price", price)
        productData.append("quantity", quantity)
        productData.append("category", category)
         productData.append("photo", photo)
        const {data} = await axios.put(`http://localhost:8000/api/v1/product/update-product/${id}`, productData)
      
        if(data?.success){
          toast.success("Product updated successfully")
          navigate("/dashboard/admin/products")
        }else{
          toast.error("something went wrong")
        }
      } catch (error) {
        console.log(error)
        toast.error("something went wrong")
      }
    }
    //============handle delete=======================
    const handleDelete = async () =>{
        try {
            let answer = window.prompt("Are you sure want to delete this product ?");
            if(!answer) return;
            const {data} = await axios.delete(`http://localhost:8000/api/v1/product/delete-product/${id}`)
          if(data.success){
            toast.success(" product deleted successfully")
            navigate("/dashboard/admin/products")
          }

        } catch (error) {
            console.log(error)
            toast.error("something went wrong")
            
        }
    }
  return (
    <div>
        <Layout title={"dashboard-update-product"}>
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>AdminDashboard</h1>  
                <hr/>
            <div className="row">
                <div className="col-md-3">
                        <AdminMenu/>
                </div>
                <div className="col-md-9"> 
                  <h1>Update Product</h1>
                  <div className="m-1 w-75">
                    <Select bordered={false} placeholder="Select a category"
                    size="large" showSearch className='form-select mb-3'
                    onChange={(value)=> {setCategory(value)}}
                            value = {category}
                        >
                        {
                          categories.map(c =>(
                            <Option key={c._id} value={c._id}>{c.name}</Option>
                          ))
                        }
                    </Select>
                    <div className="mb-3">
                        <p>Upload Picture</p>
                      <label className='btn btn-outline-success col-md-12'>
                      {photo ? photo.name  : "Upload Photo"}  
                          <input
                           type="file"
                           name="photo"
                           accept="image/*"
                           onChange={(e) => setPhoto(e.target.files[0])} 
                           hidden/>
                      </label>
                    </div>
                    {/* <div className="mb-3">
                      {  photo    ? (
                          <div className="text-center">
                            <img src={URL.createObjectURL(photo)} 
                            alt="product_photo" 
                            height={"200px"} className='img img-responsive'/>
                          </div>
                        ):(
                           
                       )
                     }
                    
                    </div> */}
                    <div className="text-center">
                                <img src={`http://localhost:8000/api/v1/product/product-photo/${id}`}
                                 alt="product_photo"
                                height={"200px"}
                                 className='img img-responsive'
                      />
                            </div>
                  
                    <div className="mb-3">
                    <p>Product Name</p>
                      <input type="text" value={name} placeholder='Write a product name'
                      className='form-control' onChange={(e) => setName(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <p>Product Description</p>
                      <input type="text" value={description} placeholder='Write product description'
                      className='form-control' onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                   
                    <div className="mb-3">
                      <p>Product Price</p>
                      <input type="number" value={price} placeholder='Write a price amount'
                      className='form-control' onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                      <p>Product Quantity</p>
                      <input type="number" value={quantity} placeholder='Write a product quantity'
                      className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
                    </div>

                    <div className="mb-3">

                      <Select
                       bordered={false}
                        placeholder="select shipping"
                        size="large"
                        showSearch
                        className='form-select-mb-3'
                        onChange={(value) =>{setShipping(value)}}
                        value={shipping ? "yes" : "No"}
                        >
                          <Option value="0">NO</Option>
                          <Option value="1">YES</Option>
                      </Select>
                    </div>
                    <div className="mb-3">
                      <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
                    </div>
                    <div className="mb-3">
                      <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
                    </div>

                  </div>
                </div>
            </div>
        </div>

    </Layout>
    </div>
  )
}

export default UpdateProduct