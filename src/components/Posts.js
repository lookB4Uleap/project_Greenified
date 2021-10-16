import React, { useEffect, useState } from 'react'
import '../component-styles/Posts.css'
import heart_empty from '../Images/heart-regular.svg';
import heart_solid from '../Images/heart-solid.svg';

const Posts = ({head, body, doLike, linkUrls, linkNames, dateOfCreation, photoUrl}) => {

    const [like, setLike] = useState(false)
    // const [user, setUser] = useState({})
    const [date, setDate] = useState("")

    useEffect(() => { 
        // console.log(linkUrls)
        // setUser(JSON.parse(sessionStorage.getItem('user')))
        if (dateOfCreation != null)
        setDate(String(dateOfCreation.getFullYear()) + " / " +
            String(dateOfCreation.getMonth()) + " / " +
            String(dateOfCreation.getDate())
        )
    }, [dateOfCreation, linkUrls])

    return (
        <div className='Post-Container'>
            <div className='Post-Header'>
            <div className='Post-User'>
                <img src={photoUrl} id='user' alt='user' />
                {head}
            </div>
                <div className='Post-Date-Of-Creation'>
                    {date}
                </div>
            </div>
            <div className='Post-Body'>
                {body}
                <div className='Post-Links'>
                {
                    linkUrls.map(
                        (linkUrl) => <a key={linkUrl} href={linkUrl}>
                                        {linkUrl} 
                                    </a>
                    )
                }
                </div>
                
            </div>
            <div className='Post-Interact' onClick={() => {setLike(!like)}}>
                {like ? 
                <img src={heart_solid} alt='heart-solid' /> :
                <img src={heart_empty} alt='heart-empty' />}
            </div>
        </div>
    )
}

export default Posts
