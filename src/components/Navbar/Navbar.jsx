import React from 'react'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';
function NavBar() {

    const {user, Logout} = useContext(AuthContext);
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
                {!user ? <div className='navbar-auth-links'>
                    <Link to="/auth" className='btn btn-secondary'>
                        Login
                    </Link>
                    <Link to="/auth" className='btn btn-primary'>
                        SignUp
                    </Link>
                </div> : <div className="navbar-greeting">
                    <span className='navbar-greeting-text'>Hello, {user.email}</span>
                    <button className='btn btn-secondary' onClick={Logout}>Logout</button>
                </div>}
            </div>
        </div>
    </nav>
  )
}

export default NavBar