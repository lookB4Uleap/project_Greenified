import React, { useEffect, useState } from 'react'
// import '../component-styles/Home.css'
import Posts from './Posts'
import TextField from './TextField'
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { auth } from '../Firebase';
import axios from 'axios';
import Head from './Head';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import { URL } from '../URL';
// import { user } from './Values';

const UserPosts = () => {

    const [user, loading] = useAuthState(auth)
    const [dispTextField, setDispTextField] = useState(true);
    const [posts, setPosts] = useState([])
    // console.log(user);

    const getUserPosts = async (user) => {
        // let user = JSON.parse(sessionStorage.getItem('user'))
        // const url = 'http://localhost:4001/post'
        await axios.get(URL + 'post/' + user.uid)
            .then(
                res => setPosts(res.data)
            )
            .catch(
                err => console.log(err) 
            )
    }

    useEffect(() => {
        if (user)
        getUserPosts(user)
    })

    useEffect(() => {
        return () => {
            setPosts([])
        }
    }, [])

    const display = () => {
        setDispTextField(!dispTextField);
        if (dispTextField) {
            document.getElementById('text-field').style.display = 'flex';
            // document.getElementById('home-container').style.opacity = '0.2';
            document.body.classList.add("StopScrolling");
        }
        else {
            document.getElementById('text-field').style.display = 'none';
            // document.getElementById('home-container').style.opacity = '1';
            document.body.classList.remove("StopScrolling");
        }
        
    }

    return (
        <div id='home-container'>
            <Head name='My Posts' />
            <TextField display={display} user={user} />
            {/* <Text display={display} />    */}
            {
                loading ? <p>Loading...</p> :
                
                    posts.map(
                        (post) => <Posts key={post._id}
                        id={post._id}
                        userId={post.userId}
                        head={post.userName}
                        body={post.post}
                        photoUrl={post.photoUrl}
                        dateOfCreation={new Date(post.dateOfCreation)}
                        likes={post.likes}
                        likedBy={post.likedBy}
                    />
                    )
                
            }
        </div>
    )
}

const Text = ({display}) => {
    return (
        <div className='TextFieldBtn'>
            <div className='FieldName'>POST</div>
            <div className='ActionBtn' onClick={display} >
                Click to Post
            </div>
        </div>
    );
}

export default UserPosts;
