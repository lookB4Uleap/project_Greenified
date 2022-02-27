import React, { useEffect, useState } from 'react'
// import '../component-styles/Home.css'
// import Posts from './Posts'
// import TextField from './TextField'
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../Firebase';
import axios from 'axios';
import Posts from './Posts';
// import { loggedIn, LoggedIn, setUser } from './Values';
import Head from './Head';
import TextField from './TextField';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { URL } from '../URL';

const Home = () => {
    const [user, loading] = useAuthState(auth)
    const [posts, setPosts] = useState([])

    const getUserIfExists = async () => {
        // const url = 'http://localhost:4001/user'
        let user_details
        await axios.get(URL + 'user/' + user.uid).then(
            res => {
                // flag = res.data.flag
                // // console.log(flag)
                // if (flag === 1)
                //     console.log(res.data)
                // console.log(res.data)
            }
        ).catch(
            err => {
                console.log(err)
                user_details = {
                    userId: user.uid,
                    userName: user.displayName,
                    userEmail: user.email,
                    photoUrl: user.photoURL
                }
                axios.post(URL + 'user/', user_details)
                    .then(
                        res => console.log(res.data)
                    )
                    .catch(
                        err => console.log(err)
                    )
            }
        )
        // console.log(flag)    
        // if (flag === -1) {
        //     const user_details = {
        //         user_id: user.uid,
        //         user_name: user.displayName,
        //         user_email: user.email,
        //         user_photourl: user.photoURL
        //     }
        //     await axios.post(url, user_details)
        //         .then(
        //             res => console.log(res.data)
        //         )
        //         .catch(
        //             err => console.log(err)
        //         )
        // }
    }

    const getPosts = async () => {
        // const url = 'http://localhost:4001/post'
        await axios.get(URL + 'post/')
            .then(
                res => {
                    setPosts(res.data)
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    useEffect(() => {
        // async function fetchData() {
        //     await getPosts()
        //     if (user != null)
        //     await getUserIfExists()
        //     // console.log(posts)
        // }
        // fetchData()
        getPosts()
        if (user != null)
            getUserIfExists()
        // console.log(user)
    }, [user])

    useEffect(() => {
        getPosts()
    })

    // console.log(posts)

    return (
        <main id='home-container'>
            <Head name='Home' />
            {user ? <TextField user={user} /> : <></>}
            {
                posts.map(
                    (post) => post ? <Posts key={post._id}
                        id={post._id}
                        userId={post.userId}
                        head={post.userName}
                        body={post.post}
                        photoUrl={post.photoUrl}
                        dateOfCreation={new Date(post.dateOfCreation)}
                        likes={post.likes}
                        likedBy={post.likedBy}
                    /> : null
                )
            }
        </main>
    )
}

export default Home