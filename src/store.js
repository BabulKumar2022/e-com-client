import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {placeOrderReducer} from './reducer/OrderReducer'




const rootReducer = combineReducers({
    placeOrderReducer: placeOrderReducer
})

const initialState ={}
const middleware = [thunk]
const store = createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;
// https://www.youtube.com/watch?v=aDuKGa_TYdQ&list=PLuHGmgpyHfRwvDURL4coRxBdDZZ8B7JCN&index=16