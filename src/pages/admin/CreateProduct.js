import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';


const {Option} = Select;

const CreateProduct = () => {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(" ")
  const [description, setDescription] = useState(" ")
  const [price, setPrice] = useState(" ")
  const [category, setCategory] = useState()
  const [quantity, setQuantity] = useState(" ")
  const [shipping, setShipping] = useState(" ")
  const [photo, setPhoto] = useState(" ")




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


  //===========create product handle=====================

  const handleCreate = async(e)=>{
    navigate("/dashboard/admin/product")
    e.preventDefault();
    try {
      const productData = new FormData()
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("category", category)
      productData.append("photo", photo)
      const {data} = await axios.post('http://localhost:8000/api/v1/product/create-product', productData)
    
      if(data?.success){
        toast.success("Product created successfully")
      }else{
        toast.error("something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong")
    }
  }

  return (
    <Layout title={"dashboard-create-product"}>
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>AdminDashboard</h1>  
                <hr/>
            <div className="row">
                <div className="col-md-3">
                        <AdminMenu/>
                </div>
                <div className="col-md-9"> 
                  <h1>Create Product</h1>
                  <div className="m-1 w-75">
                    <Select bordered={false} placeholder="Select a category"
                    size="large" showSearch className='form-select mb-3'
                    onChange={(value)=> {setCategory(value)}}>
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
                    <div className="mb-3">
                     
                      {/* {
                        photo && (
                          <div className="text-center">
                            <img src={URL.createObjectURL(photo)} 
                            alt="product_photo" 
                            height={"200px"} className='img img-responsive'/>
                          </div>
                        )
                      } */}
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
                        >
                          <Option value="0">NO</Option>
                          <Option value="1">YES</Option>
                      </Select>
                    </div>
                    <div className="mb-3">
                      <button className='btn btn-primary' onClick={handleCreate}>CREATE PRODUCT</button>
                    </div>

                  </div>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default CreateProduct