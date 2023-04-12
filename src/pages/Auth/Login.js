import React, { useState } from 'react'
import Layout from '../../components/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
 
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const navigate = useNavigate()



    // ===========form submit===============
    const handleSubmit = async (e) =>{
    e.preventDefault()
    // console.log(name, email, password, phone, address)
   try {
    const res = await axios.post(
        `http://localhost:8000/api/v1/auth/login`,
         {email, password});
         if(res.data.success){
            toast.success(res.data.message)
            navigate("/");
         }else{
            toast.error(res.data.message)
         }

   } catch (error) {
    console.log(error)
    toast.error('Something went wrong')
   }
}

  return (
    <Layout title={'Login'}>
            <div className="login">
            <h1>LOGIN</h1>  
        <form onSubmit={handleSubmit}>

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

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    </Layout>
  )
}

export default Login