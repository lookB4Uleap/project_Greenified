import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { useAuthState } from 'react-firebase-hooks/auth';
import '../component-styles/TextField.css'
// import { auth } from '../Firebase';
import Links from './Links';

const TextField = ({display, user}) => {

    const [post, setPost] = useState("")
    const [links, setLink] = useState([])
    const [linkId, setLinkId] = useState(0)

    useEffect(() => {
        // console.log(links)
        // console.log(post)
    }, [])

    const createPost = async() => {
        const url = 'http://localhost:4001/post'
        let linkUrls = []
        for (let i=0; i<linkId; ++i) {
            // linkNames.push(links[i][1])
            linkUrls.push(links[i][2])
        }
        const new_post = {
            userId: user.uid,
            userName: user.displayName,
            post: post,
            links: linkUrls,
            photoUrl: user.photoURL    
        }
        console.log('Create Post')
        await axios.post(url, new_post)
            .then(
                res => {
                    // console.log(res.data)
                    updatePosts()
                }
            )
            .catch(
                err => console.log(err)
            )
    }

    const updatePosts = async () => {
        const url = 'http://localhost:4000/user'
        const update_no_posts = { post: 1 }
        await axios.patch(url + '/' + user.uid, update_no_posts)
            .then(
                // res => console.log(res.data)
            )
            .catch(
                err => console.log(err)
            )
    }

    return (
        <div className='Background' id='text-field' >
            <div className='FieldContainer'>
                <div className='FieldHeader'>
                    <button onClick={display}>
                        Close
                    </button>
                </div>
                <div className='FieldInput'>
                    <textarea
                        onChange = {(e) => {
                            if (e.target.value.length <= 1000)
                            setPost(e.target.value);
                        }}
                        maxLength={1000}
                        id = 'text-post'
                    >
                        
                    </textarea>
                </div>
                <div>
                    Characters : {post.length}/1000
                </div>
                <div className='Links'>
                    {links.map(
                        (link) => (
                            <Links key={link[0]} links={link}  />
                        )
                    )}
                </div>
                <div className='FieldOptions'>
                    <button
                        onClick = {() => {
                            if (linkId >= 3 ) {
                                alert('No more links can be added')
                                return
                            }
                            let link_details = [linkId, '', '']
                            links.push(link_details)
                            setLink(links)
                            setLinkId(linkId + 1)
                        }}
                    >
                        Link
                    </button>
                    <button
                        onClick = {
                            () => {
                                console.log(links)
                                setLink([])
                                setLinkId(0)
                                setPost("")
                                createPost()
                                document.getElementById('text-post').value = ''
                                display()
                            }
                        }
                    >
                        Post
                    </button>

                </div>
            </div>
        </div>
        
    )
}

export default TextField
