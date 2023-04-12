import React, { useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [phone, setPhone]= useState('');
    const [address, setAddress]= useState('');

    const navigate = useNavigate()



    // ===========form submit===============
    const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(name, email, password, phone, address)
   try {
    const res = await axios.post(
        `http://localhost:8000/api/v1/auth/register`,
         {name, email, password, phone, address});
         if( res.data.success){
            toast.success("User registration successfully")
            navigate("/login");
         }else{
            toast.error(res.data.message)
         }

   } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
   }
}

  return (
    <Layout title={'Register'}>
      <div className="register">
            <h1>Register</h1>  
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <input value ={name}
                required
                onChange={(e)=> setName(e.target.value)}
                type="text" className="form-control"
                id="exampleInputEmail1" 
                placeholder='Name' />
            </div>
            <div className="mb-3">
                <input 
                value={email} type="email" 
                required
                onChange={(e)=> setEmail(e.target.value)}
                className="form-control" 
                id="exampleInputEmail1" 
                placeholder='Email' />
            </div>
            <div className="mb-3">
                <input value={password} type="password" 
                required
                onChange={(e)=> setPassword(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder='Password'/>
            </div>
            <div className="mb-3">
                <input value={phone} type="number" 
                required
                onChange={(e)=> setPhone(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder='Phone Number'/>
            </div>
            <div className="mb-3">
                <input value={address} type="text" 
                required
                onChange={(e)=> setAddress(e.target.value)}
                className="form-control" 
                id="exampleInputPassword1" 
                placeholder='Address'/>
                
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register