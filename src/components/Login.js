import React, { useEffect } from 'react'
import '../component-styles/Login.css';
import { auth, provider } from '../Firebase';
import { useHistory } from 'react-router-dom';
import { loggedIn } from './Values';
import google from '../Images/google.png'
import facebook from '../Images/facebook.png'
import twitter from '../Images/twitter.png'
// import { useAuthState } from 'react-firebase-hooks/auth';

const Login = ({user}) => {

    let history = useHistory();
    const loginWithGoogle = () => {
        auth.signInWithPopup(provider).then(
            (result) => {
                history.replace("/")
                loggedIn(true)
            }
        ).catch((err) => 
        console.log(err)); 
    }
    
    useEffect(() => {
        if (user) {
            history.replace("/")
        }
    }, [history, user])

    return (
        <div className='Login-Container'>
            <div className='Login-Content'>
                <div className='Login-Header'>
                    LOGIN
                </div>
                <div className='Login-Options'>
                    <div className='Login-Buttons' onClick = {loginWithGoogle}>
                        <img src={google} alt='google' />
                        Google
                    </div>
                    <div className='Login-Buttons'>
                        <img src={facebook} alt='facebook' />
                        Facebook
                    </div>
                    <div className='Login-Buttons'>
                        <img src={twitter} alt='twitter' />
                        Twitter
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
