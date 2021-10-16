import React, { useEffect, useState } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink, useHistory  } from 'react-router-dom'
import '../component-styles/UserOptions.css'
// import { auth } from '../Firebase';

const UserOptions = ({logoutUser, user}) => {
    const history = useHistory()
    const [disp, setDisp] = useState(true)

    const setDisplay = () => {
        setDisp(!disp)
        if (disp)
        document.getElementById('user-opts').style.display = 'flex'
        else
        document.getElementById('user-opts').style.display = 'none'
    }

    const setDisplayOff = () => {
        setDisp(!disp)
        document.getElementById('user-opts').style.display = 'none'
    }

    const logout = () => {
        setDisplayOff()
        history.goBack()
        setTimeout(() => {
            logoutUser()
        }, 100)
    }

    useEffect(() => {
        // setUser(JSON.parse(sessionStorage.getItem('user')))
    })

    return (
        <div className='User-Main-Container'>
            <div id='user-icon' onClick = {setDisplay}>
                {/* <img src={user.photoURL} id='user-photo' alt='user' /> */}
                <i className="fas fa-bars"></i>
            </div>
            <div className='User-Options' id='user-opts'>
                <div className='User-Option'>
                    <img src={user.photoURL} id='user-photo' alt='user' />
                    {user.displayName}
                </div>
                <NavLink 
                    exact to='/yourPosts'
                    onClick = {setDisplayOff}
                    className='User-Option'
                    activeClassName='Active-User-Option'
                    >
                    My Posts/ Create Post
                </NavLink>
                <NavLink exact to='/'
                        className='User-Option'
                        onClick = {logout}
                        >
                           Logout
                       </NavLink>
            </div>
        </div>
    )
}

export default UserOptions
