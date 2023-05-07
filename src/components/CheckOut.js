import { Button } from 'react-bootstrap'
import React from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { useDispatch } from 'react-redux'
import {placeOrder} from '../action/orderAction'

const CheckOut = ({totalPrice}) => {
    const dispatch = useDispatch()
    const tokenHandler = (token)=>{
      dispatch(placeOrder(token, totalPrice))
        console.log(token)
    }
  return (
    <StripeCheckout
    amount= {totalPrice * 100}
    shippingAddress
    token ={tokenHandler}
    stripeKey='pk_test_51N3LwID3DUasc0CjWrvh6w9hpnOfLFxauyxUttcSsyQ644DmA7DEOFc1VWhy4pU5zUI2eDCJJ5Mr6kc2uLVoyZS900n2nL5zM6'
    currency='INR'
   >
        <Button>Pay Now</Button>
    </StripeCheckout>
  )
}

export default CheckOut