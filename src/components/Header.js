import React from 'react'
import { NavLink , Link} from 'react-router-dom';
import {GiShoppingBag} from 'react-icons/gi'
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';
import SearchInput from './Form/SearchInput';
import useCategory from './hooks/useCategory';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const categories = useCategory()
    const handleLogout = () =>{
        setAuth({
            ...auth,
            user: null,
            token: ''
        });
        localStorage.removeItem('auth')
        toast.success("Logout successfully");
    }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to='/' className="navbar-brand" href="#"><GiShoppingBag/> ONLINE SHOP</Link>
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <SearchInput/>
                    <li className="nav-item">
                    <NavLink to='/' className="nav-link mx-2 " >Home</NavLink>
                    </li>
                    {/* <li className="nav-item">
                        <NavLink to='/category' className="nav-link " >Category</NavLink>
                    </li> */}
                    <li class="nav-item dropdown">
                         <Link class="nav-link dropdown-toggle" to={"/categories"}  id="navbarDropdown" data-bs-toggle="dropdown" >
                            Category
                        </Link>
                        <ul className="dropdown-menu" >
                            <li>
                                <Link className="dropdown-item" to={"/categories"}>All Categories</Link>
                            </li>
                            {
                                categories?.map(c =>(
                                <li>
                                    <Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link>
                                </li>
                                ))
                            }
                        </ul>
                    </li>
                   
                  {
                    !auth.user ? (<>

                        <li className="nav-item">
                        <NavLink to='/register' className="nav-link" href="#">Register</NavLink>
                        </li>
                        <li className="nav-item">
                        <NavLink to='/login' className="nav-link" href="#">Login</NavLink>
                        </li>
                    </>) : (<>
                        <li class="nav-item dropdown">
                            <NavLink class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {auth?.user.name}
                            </NavLink>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <li><NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} href="#" >DASHBOARD</NavLink></li>
                                <li className="nav-item"><NavLink onClick={handleLogout} to='/login' className="nav-link" href="#">Logout</NavLink></li>
                            </ul>
                        </li>
                        
                    </>)
                  }
                    <li className="nav-item">
                    <NavLink to='/cart' className="nav-link" href="#">Cart (0)</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Header