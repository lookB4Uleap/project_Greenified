import React from 'react'
import { useHistory } from 'react-router-dom'
import tree from './Images/tree.png'

const Logo = () => {

    const history = useHistory();

    return (
        <div className='Logo' onClick = {() => history.replace("/")} >
            <img src={tree} alt='logo' />
            Greenified
        </div>
    )
}

export default Logo
