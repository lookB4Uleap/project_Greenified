import { Avatar, Button, IconButton, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import url from 'url'
import { auth } from '../Firebase'
import Head from './Head'
import Posts from './Posts'
import SendIcon from '@mui/icons-material/Send'
import { URL } from '../URL'

const PostDetails = () => {
    const location = useLocation()
    const history = useHistory()
    // const URL = 'http://localhost:4001/post/specificPost/'
    const [post, setPost] = useState({})
    const [user, loading] = useAuthState(auth)

    useEffect(() => {
        const query = url.parse(location.search, true).query
        // console.log(location)
        // console.log(query)

        if (query.id)
            axios.get(URL + 'post/specificPost/' + query.id)
                .then((res) => {
                    // console.log(res.data)
                    setPost(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        else {
            if (!query.id)
                alert('Post Id not found')
            history.replace("/")
        }

        return () => {
            setPost({})
        }
    }, [])

    return (
        <main id="home-container">
            <Head name='Post' />
            <Posts key={post._id}
                id={post._id}
                head={post.userName}
                body={post.post}
                photoUrl={post.photoUrl}
                dateOfCreation={new Date(post.dateOfCreation)}
                comments={post.comments}
                likes={post.likes}
                likedBy={post.likedBy}
            />
            <Head name='Comments' />
            <AddComment user={user} setPost={setPost} postId={url.parse(location.search, true).query.id} />
            {
                post?.comments?.map(
                    (comment) => comment ? <Comment
                        key={comment._id}
                        comment={comment.body}
                        commentorId={comment.userId}
                        dateOfCreation={comment.dateOfCreation}
                    /> : null
                )
            }
        </main>
    )
}

const AddComment = ({ user, setPost, postId }) => {
    const [body, setBody] = useState("")
    // const URL = 'http://localhost:4001/post/comment/'
    // const [user, loading] = useAuthState(auth)

    const pushComment = () => {
        const comment = {
            userId: user.uid,
            body: body
        }

        // console.log(comment)

        if (user && body)
            axios.post(URL + 'post/comment/' + postId, comment)
                .then(res => setPost(res.data))
                .catch(err => console.log(err))
        else
            alert("Login to comment!")
    }

    return (
        <div className='Comment-Container'>
            <div style={{ width: '10%', minWidth: 40, paddingRight: 5 }}>
                <Avatar
                    alt='User'
                    src={user?.photoURL}
                />
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <TextField
                    id="standard-textarea"
                    label="Add a Comment"
                    multiline
                    variant="standard"
                    style={{ width: '90%' }}
                    onChange={(e) => {
                        if (body.length <= 100)
                            setBody(e.target.value)
                        else if (e.target.value.length <= 100)
                            setBody(e.target.value)
                        else
                            e.target.value = body
                    }}
                />
                <IconButton onClick={() => pushComment()} >
                    <SendIcon />
                </IconButton>
            </div>

        </div>
    )
}


const Comment = ({ comment, commentorId, dateOfCreation }) => {
    // const id = '0hwDnUfZY9RDqfInVCEZQtBtSvD2' 
    const [commentor, setCommentor] = useState({})
    const date = new Date(dateOfCreation)

    console.log({ comment, commentorId, dateOfCreation })

    useEffect(() => {
        // const URL = 'http://localhost:4001/user/'
        axios.get(URL + 'user/' + commentorId)
            .then((res) => {
                // console.log(res.data)
                setCommentor(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div className='Comment-Container' style={{ marginBotom: 10 }}>
            <div style={{
                width: '10%',
                minWidth: 40,
                alignSelf: 'start',
                paddingRight: 5
            }}>
                <Avatar
                    alt='User'
                    src={commentor?.photoUrl}
                />
            </div>
            <div style={{
                width: '90%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    fontSize: 14
                }}>
                    <b>{commentor?.userName}</b>
                    <div style={{ marginLeft: 10 }}>{date.getFullYear()} / {date.getMonth()} / {date.getDate()}</div>
                </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    fontSize: 18,
                    flexWrap: 'wrap'
                }}>
                    {/* kandsnfsdflksdfksd lkdnsl nnsl nlsad ansn lans laslkn andn anna sndna snn ansdn lasnld nnas nansd nlasnln lans lnlans lnlsan lnalsn lnsal nldnals nlndsa lndljnsa lnasln lnasljd nljan ldnlsan dlanslj */}
                    {comment}
                </div>
            </div>
        </div>
    )
}

export default PostDetails