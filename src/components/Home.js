import React, { useEffect, useState } from 'react'
import '../component-styles/Home.css'
// import Posts from './Posts'
// import TextField from './TextField'
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../Firebase';
import axios from 'axios';
import Posts from './Posts';
// import { loggedIn, LoggedIn, setUser } from './Values';
import Head from './Head';

const Home = ({ user }) => {

    const [posts, setPosts] = useState([])

    const getUserIfExists = async () => {
        const url = 'http://localhost:4001/user'
        let user_details
        await axios.get(url + '/' + user.uid).then(
            res => {
                // flag = res.data.flag
                // // console.log(flag)
                // if (flag === 1)
                //     console.log(res.data)
                console.log(res.data)
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
                axios.post(url, user_details)
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
        const url = 'http://localhost:4001/post'
        await axios.get(url)
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
    }, [user])

    return (
        <main id='home-container'>
            <Head name='Home' />
            {
                posts.map(
                    (post) => post ? <Posts key={post._id}
                        head={post.userName}
                        body={post.post}
                        photoUrl={post.photoUrl}
                        linkUrls={post.links}
                        linkNames={post.linkNames}
                        dateOfCreation={new Date(post.dateOfCreation)}
                    /> : null
                )
            }
        </main>
    )
}

export default Home