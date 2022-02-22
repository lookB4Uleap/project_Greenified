// import React, { useEffect, useState } from 'react'
// import '../component-styles/Posts.css'
// import heart_empty from '../Images/heart-regular.svg';
// import heart_solid from '../Images/heart-solid.svg';

// const Posts = ({ head, body, doLike, linkUrls, linkNames, dateOfCreation, photoUrl }) => {

//     const [like, setLike] = useState(false)
//     // const [user, setUser] = useState({})
//     const [date, setDate] = useState("")

//     useEffect(() => {
//         // console.log(linkUrls)
//         // setUser(JSON.parse(sessionStorage.getItem('user')))
//         if (dateOfCreation != null)
//             setDate(String(dateOfCreation.getFullYear()) + " / " +
//                 String(dateOfCreation.getMonth() + 1) + " / " +
//                 String(dateOfCreation.getDate())
//             )
//     }, [dateOfCreation, linkUrls])

//     return (
//         <div className='Post-Container'>
//             <div className='Post-Header'>
//                 <div className='Post-User'>
//                     <img src={photoUrl} id='user' alt='user' />

//                 </div>
//                 <div>

//                     {head}
//                     <div className='Post-Date-Of-Creation'>
//                         {date}
//                     </div>
//                 </div>
//             </div>
//             <div className='Post-Body'>
//                 {body}
//             </div>
//             <div className='Post-Interact' onClick={() => { setLike(!like) }}>
//                 {like ?
//                     <img src={heart_solid} alt='heart-solid' /> :
//                     <img src={heart_empty} alt='heart-empty' />}
//             </div>
//         </div>
//     )
// }

// export default Posts


import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CommentIcon from '@mui/icons-material/Comment';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import axios from 'axios';
import { URL } from '../URL';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function Posts({ id, head, body, dateOfCreation, photoUrl, comments, userId, likes, likedBy }) {
    const history = useHistory()
    const [user, loading] = useAuthState(auth)
    const [expanded, setExpanded] = React.useState(false)
    const [date, setDate] = React.useState("")
    const [like, setLike] = React.useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    React.useEffect(() => {
        // console.log(linkUrls)
        // setUser(JSON.parse(sessionStorage.getItem('user')))
        if (dateOfCreation != null)
            setDate(String(dateOfCreation.getFullYear()) + " / " +
                String(dateOfCreation.getMonth() + 1) + " / " +
                String(dateOfCreation.getDate())
            )
    }, [dateOfCreation])

    React.useEffect(() => {
        let flag = 1
        if (likedBy)
            if (user)
                for (let i = 0; i < likedBy.length; ++i) {
                    if (likedBy[i] === user.uid) {
                        setLike(true)
                        flag = 0
                        break
                    }
                }
        if (flag === 1)
            setLike(false)
    })

    React.useEffect(() => {
        return () => {
            setLike(false)
            setDate('')
            setExpanded('')
        }
    }, [])

    const updateLike = (val) => {
        // const URL = 'http://localhost:4001/post/incLike/'
        const body = {
            like: val,
            userId: user.uid
        }

        axios.post(URL + 'post/incLike/' + id, body)
            // .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const toggleLike = (val) => {
        if (user) {
            if (val === -1) {
                setLike(false)
                updateLike(val)
            }
            if (val === 1) {
                setLike(true)
                updateLike(val)
            }
        }
        // console.log(-val)
    }

    return (
        <Card className="Posts" >
            <CardHeader
                avatar={
                    <Avatar src={photoUrl} onClick={() => { history.push(`/profile?id=${userId}`) }} className='Clickable' />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <div onClick={() => { history.push(`/profile?id=${userId}`) }} className='Clickable' >
                        {head}
                    </div>}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary" style={{ fontSize: 18, color: "#242f3f", fontFamily: "Times New Roman" }}>
                    {body}
                </Typography>
            </CardContent>
            <CardActions style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {
                    like ?
                        <IconButton aria-label="add to favorites"
                            style={{ paddingLeft: 20, paddingRight: 20 }}
                            onClick={() => toggleLike(-1)}
                        >
                            <FavoriteIcon /> {likes}
                        </IconButton> :
                        <IconButton aria-label="add to favorites"
                            style={{ paddingLeft: 20, paddingRight: 20 }}
                            onClick={() => toggleLike(1)}
                        >
                            <FavoriteBorderIcon /> {likes}
                        </IconButton>
                }
                {!comments ?
                    <IconButton
                        aria-label="comments" style={{ paddingLeft: 20, paddingRight: 20 }}
                        onClick={() => history.push(`/postDetails?id=${id}`)}
                    >
                        <CommentIcon />
                    </IconButton> : <></>
                }
                <IconButton aria-label="share" style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}
