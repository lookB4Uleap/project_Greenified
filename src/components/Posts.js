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
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

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

export default function Posts({ head, body, doLike, linkUrls, linkNames, dateOfCreation, photoUrl }) {
    const [expanded, setExpanded] = React.useState(false);
    const [date, setDate] = React.useState("")

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

    return (
        <Card className="Posts" >
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" src={photoUrl} />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={head}
                subheader={date}
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {body}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
            </CardActions>

        </Card>
    );
}
