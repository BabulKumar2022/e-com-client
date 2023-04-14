import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Spinner = () => {
const [count, setCount] = useState(5);
const navigate = useNavigate();


useEffect(()=>{
  const interval =setInterval(()=>{
setCount((prevValue)=> --prevValue)
  }, 1000)
  count === 0 && navigate("/login")
  return ()=> clearInterval(interval);
},[count, navigate])


  return (
    <>
        <div className="d-flex justify-content-center align-items-center text-primary ">
          <h1 className=''> Redirecting to {count}</h1>
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    </>
  )
}

export default Spinner