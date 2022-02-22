import { Button } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory, useLocation } from 'react-router-dom'
import { auth } from '../Firebase'
import { URL } from '../URL'
import Head from './Head'
import url from 'url'

const Profile = () => {
    const [user, loading] = useAuthState(auth)
    const location = useLocation()
    const history = useHistory()
    // const URL = 'http://localhost:4001/user/'
    const [profile, setProfile] = useState({})
    // const [following, setFollowing] = useState(false)

    useEffect(() => {
        const query = url.parse(location.search, true).query
        // console.log(location)
        // console.log(query)

        if (query.id)
            axios.get(URL + 'user/' + query.id)
                .then((res) => {
                    // console.log(res.data)
                    setProfile(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        else {
            alert('Profile Id not found')
            history.replace("/")
        }

        // if (profile && profile.followers) {
        // for (let i = 0; i < profile.followers.length; ++i) {
        //     if (profile.followers[i] === user.uid) {
        //         setFollowing(true)
        //         break
        //     }
        // }
        // if (profile && profile.followers) {
        //     for (let i = 0; i < profile.followers.length; ++i) {
        //         if (profile.followers[i] === user.uid) {
        //             setFollowing(true)
        //             break
        //         }
        //     }
        // }

    })

    useEffect(() => {
        return () => {
            setProfile({})
        }
    }, [])


    const followUser = () => {
        const follow = {
            followerId: user.uid
        }
        console.log(follow)
        axios.post(URL + 'user/follow/' + profile._id, follow)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    // console.log(profile)
    let following = false
    if (profile && profile.followers)
        for (let i = 0; i < profile.followers.length; ++i) {
            if (profile.followers[i] === user.uid) {
                // setFollowing(true)
                following = true
                break
            }
        }

    // console.log(profile.followers[0] === user.uid)
    // console.log(following)

    return (
        <div id="home-container">
            <Head name='Profile' />
            <div className='Profile-Container'>
                <div className='Profile-Details'>
                    <img src={profile.photoUrl} />
                    <div>
                        <div>{profile.userName}</div>
                        <div><a href={`mailto:${profile?.userEmail}`}>{profile.userEmail}</a></div>
                        <div>Followers : {profile?.followers?.length}</div>
                        <div>Following : {profile?.following?.length}</div>
                    </div>
                </div>

                {user ? following ?
                    <Button variant="contained" disabled style={{ width: 100 }} >Following</Button> :
                    user.uid === profile._id ?
                        <Button variant="contained" disabled style={{ width: 100 }} >Follow</Button> :
                        !profile ?
                        <Button variant="contained" style={{ width: 100 }} onClick={followUser} >Follow</Button> :
                        <></> : <></>}
            </div>
            {/* {profile._id} */}
        </div>
    )
}

export default Profile