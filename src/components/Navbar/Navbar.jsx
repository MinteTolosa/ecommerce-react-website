import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';
function NavBar() {
  return (
    <nav className='navbar'>
        <div className='nav-container'>
            <Link to="/" className='navbar-brand'>Addis-Shop</Link>
            <div className='navbar-links'>
                <Link to="/" className='navbar-link'>
                    Home
                </Link>
                <Link to="/checkout" className='navbar-link'>
                    Cart
                </Link>
            </div>
            <div className='navbar-auth'>
                <div className='navbar-auth-links'>
                    <Link to="/auth" className='btn btn-secondary'>
                        Login
                    </Link>
                    <Link to="/auth" className='btn btn-primary'>
                        SignUp
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar