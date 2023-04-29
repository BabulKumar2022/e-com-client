import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";

import  { Toaster } from 'react-hot-toast';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/routes/Private";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./components/routes/AdminRoute";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Profile from "./pages/user/Profile";
import Order from "./pages/user/Order";
import Products from "./pages/admin/Products";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";



function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/product/:slug" element={<ProductDetails/>}/>
        <Route path="/search" element={<SearchPage/>}/>
        <Route path="/dashboard" element={<PrivateRoute/>}>
           <Route path="user" element={<Dashboard/>}/>
           <Route path="user/profile" element={<Profile/>}/>
           <Route path="user/order" element={<Order/>}/>
        </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
            <Route path="admin" element={<AdminDashboard/>}/>
            <Route path="admin/create-category" element={<CreateCategory/>}/>
            <Route path="admin/create-product" element={<CreateProduct/>}/>
            <Route path="admin/product/:slug" element={<UpdateProduct/>}/>
            <Route path="admin/products" element={<Products/>}/>
            <Route path="admin/users" element={<Users/>}/>
          </Route>
      
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/about" element={<AboutPage/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/policy" element={<Policy/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    
    </>
  );
}

export default App;
