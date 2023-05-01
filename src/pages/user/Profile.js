import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'

import { useAuth } from '../../context/auth';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Profile = () => {
    const navigate = useNavigate()
    const [auth, setAuth] = useAuth()
    const [name, setName]= useState('');
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [phone, setPhone]= useState('');
    const [address, setAddress]= useState('');
// get user data===========================
useEffect(()=>{
    const {  name, email, password, phone, address } = auth.user;
    setName(name)
    
    setPhone(phone)
    setEmail(email)
    setPassword(password)
    setAddress(address)

},[])
    // ===========form submit===============
    const handleSubmit = async (e) =>{
        e.preventDefault()
            navigate("/")
        // console.log(name, email, password, phone, address)
       try {
        const {data}= await axios.put(
            `http://localhost:8000/api/v1/auth/profile`,
             {name, email, password,  phone, address});
             if( data?.error){
                toast.error(data?.error)
   
             }else{
               setAuth({...auth, user: data?.updatedUser})
               let ls = localStorage.getItem("auth")
               ls = JSON.parse(ls)
               ls.user = data?.updatedUser
               localStorage.setItem("auth", JSON.stringify(ls))
               toast.success("Profile updated successfully")
             }
    
       } catch (error) {
        console.log(error)
        toast.error('Something went wrong')
       }
    }
    

  return (
    <Layout title="Profile">
        <div className="container-fluid m-3 p-3">
        <h1 className='text-center'>User Dashboard</h1>  
        <hr/>
            <div className="row">
                <div className="col-md-3">
                    <UserMenu/>
                </div>
                <div className="col-md-9 register">
                    <h2 className='text-center'>User profile</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input value ={name}
                          
                            onChange={(e)=> setName(e.target.value)}
                            type="text" className="form-control"
                            id="exampleInputEmail1" 
                            placeholder='Name' />
                        </div>
                        <div className="mb-3">
                            <input 
                            value={email} type="email" 
                       
                            disabled
                            onChange={(e)=> setEmail(e.target.value)}
                            className="form-control" 
                            id="exampleInputEmail1" 
                            placeholder='Email' />
                        </div>
                        <div className="mb-3">
                            <input value={password} type="password" 
                         
                            onChange={(e)=> setPassword(e.target.value)}
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='Password'/>
                        </div>
                        <div className="mb-3">
                            <input value={phone} type="number" 
                        
                            onChange={(e)=> setPhone(e.target.value)}
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='Phone Number'/>
                        </div>
                        <div className="mb-3">
                            <input value={address} type="text" 
                      
                            onChange={(e)=> setAddress(e.target.value)}
                            className="form-control" 
                            id="exampleInputPassword1" 
                            placeholder='Address'/>
                            
                        </div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>

    </Layout>
  )
}

export default Profile