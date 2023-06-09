import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import Modal from 'antd/es/modal/Modal';

const CreateCategory = () => {
  
  const [categories, setCategories] = useState([])
  const [name, setName] = useState(" ");
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState(" ")


  //handle form
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.post('http://localhost:8000/api/v1/category/create-category',{name})
      if(data?.success){
        toast.success(`${name} category is created`)
        getAllCategory()
      }else{
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in input form')
    }
  }

  //get all cat
  const getAllCategory = async()=>{
      try {
        const {data} = await axios.get('http://localhost:8000/api/v1/category/get-category')
        if(data.success){
          setCategories(data.category)
        }
      } catch (error) {
        console.log(error)
        toast.error('Something went wrong in getting category')
      }
  };
  useEffect(() =>{
    getAllCategory()
  },[])


  //update category

  const handleUpdate = async(e)=>{
    e.preventDefault();
    try {
      const {data} = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`,
       {name: updatedName})
      if(data.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null);
        setVisible(false);
        setUpdatedName("");
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went  wrong')
      
    }
  }
  const handleCancel = () => {
    setVisible(false);
  };

  // Delete category
  const handleDelete = async(id)=>{
 
    try {
      const {data} = await axios.delete(
        `http://localhost:8000/api/v1/category/delete-category/${id}`)
      if(data.success){
        toast.success(`category is Deleted`)
        getAllCategory();
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error('Something went  wrong')
      
    }
  }
  return (
    <Layout title={"dashboard-create-category"}>
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>AdminDashboard</h1>  
                <hr/>
            <div className="row">
                <div className="col-md-3">
                    <AdminMenu/>
                </div>
                <div className="col-md-9"> 
                  <h1>Manage Category</h1> 
                  <div className="p-3 w-50">
                    <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                  </div>
                  <div className="w-75">
                    <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Action-1</th>
                            <th scope="col">Action-2</th>
                          </tr>
                        </thead>
                        <tbody>
                          {categories?.map(c =>(
                            <>
                              <tr>
                               <td key={c._id}>{c.name}</td>
                               <td><button onClick={()=> {setVisible(true); setUpdatedName(c.name); setSelected(c)}}
                                type="button" class="btn btn-primary" data-bs-toggle="modal"
                                 data-bs-target="#exampleModal">Update</button></td>
                               <td><button className='btn btn-danger' onClick={() => {handleDelete(c._id)}}>Delete</button></td>
                              </tr>
                            </>
                          ))
                          }
                        </tbody>
                    </table>
                  </div>
                  <Modal title={"Update This Category"} onClick={()=> setVisible(false)} footer={null} visible={visible} onCancel={handleCancel}>
                    <CategoryForm value={updatedName} setValue={setUpdatedName } handleSubmit={handleUpdate}></CategoryForm>
                  </Modal>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default CreateCategory