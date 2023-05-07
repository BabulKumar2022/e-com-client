import React from 'react'
import Layout from '../components/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart';
import { useNavigate } from 'react-router-dom';
import CheckOut from '../components/CheckOut';



const CartPage = () => {


  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

//total price calculation==========
const totalPrice = () =>{
  try {
    let total = 0
    
    cart?.map(item => {
      total = total + Number(item.price)
    });
    
    return total.toLocaleString("en-US",{
      style: "currency",
      currency: "USD",
    })
   
  } catch (error) {
    console.log(error)
    
  }
}

  const removeCartItem = (pid) =>{
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid)
      myCart.splice(index, 1);
      setCart(myCart)
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error)
      
    }
  }
  
  return (
    <Layout title={"cart"}>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                  <h1 className='text-center bg-light p-2 mb-1'>
                    {`Hello ${auth?.token && auth?.user?.name}`}
                  </h1>
                  <h4 className="text-center">
                    {cart?.length
                    ? `You Have ${cart.length} item in your cart ${
                      auth?.token ? "" : "Please login to checkout"}`: "Your cart is empty"}
                  </h4>
                </div>
            </div>
            <div className="row">
              <div className="col-md-8">
                {
                  cart?.map((p) =>(
                    <div key={p._id} className="row card mb-2 flex-row">
                      <div className="col-md-4">
                        <img src={`http://localhost:8000/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top m-2" height={"80%"}  alt=''/>
                      </div>
                      <div className="col-md-8">
                       <h5>Name: {p.name}</h5>
                       <p>Description: {p.description.substring(0, 30)}</p>
                       <p>Price: {p.price}</p>
                       <button className='btn btn-danger' onClick={()=> removeCartItem(p._id)}>Remove</button>
                      </div>
                  </div>
                  ))
                }

              </div>
              <div className="col-md-4 text-center">
               <h2>Cart Summary</h2>
               <p>Total | Checkout</p>
               <hr />
               <h5>Total : {totalPrice()}</h5>
               <CheckOut totalPrice={totalPrice()} />
               {
                auth?.user?.address ? (
                  <>
                    <div className="mb-3">
                      <h5>Current Address</h5>
                      <h6>{auth?.user?.address}</h6>
                      <button className='btn btn-outline-warning'
                      onClick={() => navigate('/dashboard/user/profile')} 
                      >Update Address</button>
                    </div>
                  </>
                ) : (
                  <div className="mb-3">
                    {
                      auth?.token ? (
                        <button className='btn btn-outline-warning' onClick={() => navigate('/dashboard/user/profile')}> Update Address</button>
                      ) : (
                        <button className='btn btn-outline-warning' 
                        onClick={() => navigate('/login', {state: "/cart"})}
                        >Please Login to checkout</button>
                      )
                    }
                  </div>
                )
               }
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default CartPage