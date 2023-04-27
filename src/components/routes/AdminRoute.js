import { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";


export default function AdminRoute() {


const [ok, setOk] = useState(false);
const [auth, setAuth] = useAuth()



useEffect(()=>{
    const authCheek = async()=>{
     const   res = await axios.get('http://localhost:8000/api/v1/auth/admin-auth',
     
     )
     console.log(res.data.ok)
   if(res.data.ok){
    setOk(true)
   }else{
    setOk(false)
   }
    }
    if(auth?.token) authCheek();
},[auth?.token])

return ok? <Outlet/> : <Spinner path="/"/>
}

