import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import Home from './Home'
import '../component-styles/NavBar.css'
import Logo from '../Logo'
import { auth } from '../Firebase'
// import { useAuthState } from 'react-firebase-hooks/auth'
import UserOptions from './UserOptions'


const NavBar = ({ user }) => {

    const logoutUser = async () => {
        await auth.signOut()
        alert('Logged Out')
    }

    useEffect(() => {
    }, [])
        
    return (
        
            <nav className='Navbar'>
                <Logo />
                { user  ? 
                         
                       <UserOptions logoutUser = {logoutUser} user={user} /> :
                        <NavLink exact to='/login'
                        className='Link'
                        activeClassName='ActiveLink'>
                           Login
                       </NavLink>       
                }
            </nav>
            
    )
}

export default NavBar
