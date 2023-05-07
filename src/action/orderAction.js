import axios from "axios"




export const placeOrder = (token, totalPrice) => async (dispatch, getState) =>{
        dispatch({type: "PLEASE_ORDER_REQUEST"})
        const newCurrentUser = getState().User
        // const cartItems = getState().cartReducer.cartItems 
        // console.log(cartItems)
        try {
            const res = await axios.post('http://localhost:8000/api/v1/order/order-product', 
            {token, totalPrice, newCurrentUser})
            dispatch({type: 'PLACE_ORDER_SUCCESS'})
            console.log(res)
        } catch (error) {
            console.log(error)
            dispatch({type: 'PLACE_ORDER_FAIL'})
    
            
        }
}