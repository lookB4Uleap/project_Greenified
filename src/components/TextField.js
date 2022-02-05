// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// // import { useAuthState } from 'react-firebase-hooks/auth';
// import '../component-styles/TextField.css'
// // import { auth } from '../Firebase';
// import Links from './Links';

// const TextField = ({display, user}) => {

//     const [post, setPost] = useState("")
//     const [links, setLink] = useState([])
//     const [linkId, setLinkId] = useState(0)

//     useEffect(() => {
//         // console.log(links)
//         // console.log(post)
//     }, [])

//     const createPost = async() => {
//         const url = 'http://localhost:4001/post'
//         let linkUrls = []
//         for (let i=0; i<linkId; ++i) {
//             // linkNames.push(links[i][1])
//             linkUrls.push(links[i][2])
//         }
//         const new_post = {
//             userId: user.uid,
//             userName: user.displayName,
//             post: post,
//             links: linkUrls,
//             photoUrl: user.photoURL    
//         }
//         console.log('Create Post')
//         await axios.post(url, new_post)
//             .then(
//                 res => {
//                     // console.log(res.data)
//                     updatePosts()
//                 }
//             )
//             .catch(
//                 err => console.log(err)
//             )
//     }

//     const updatePosts = async () => {
//         const url = 'http://localhost:4000/user'
//         const update_no_posts = { post: 1 }
//         await axios.patch(url + '/' + user.uid, update_no_posts)
//             .then(
//                 // res => console.log(res.data)
//             )
//             .catch(
//                 err => console.log(err)
//             )
//     }

//     return (
//         <div className='Background' id='text-field' >
//             <div className='FieldContainer'>
//                 <div className='FieldHeader'>
//                     <button onClick={display}>
//                         Close
//                     </button>
//                 </div>
//                 <div className='FieldInput'>
//                     <textarea
//                         onChange = {(e) => {
//                             if (e.target.value.length <= 1000)
//                             setPost(e.target.value);
//                         }}
//                         maxLength={1000}
//                         id = 'text-post'
//                     >
                        
//                     </textarea>
//                 </div>
//                 <div>
//                     Characters : {post.length}/1000
//                 </div>
//                 <div className='Links'>
//                     {links.map(
//                         (link) => (
//                             <Links key={link[0]} links={link}  />
//                         )
//                     )}
//                 </div>
//                 <div className='FieldOptions'>
//                     <button
//                         onClick = {() => {
//                             if (linkId >= 3 ) {
//                                 alert('No more links can be added')
//                                 return
//                             }
//                             let link_details = [linkId, '', '']
//                             links.push(link_details)
//                             setLink(links)
//                             setLinkId(linkId + 1)
//                         }}
//                     >
//                         Link
//                     </button>
//                     <button
//                         onClick = {
//                             () => {
//                                 console.log(links)
//                                 setLink([])
//                                 setLinkId(0)
//                                 setPost("")
//                                 createPost()
//                                 document.getElementById('text-post').value = ''
//                                 display()
//                             }
//                         }
//                     >
//                         Post
//                     </button>

//                 </div>
//             </div>
//         </div>
        
//     )
// }

// export default TextField

import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextareaAutosize } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../Firebase';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function TextField() {
    const [user, loading] = useAuthState(auth)

    const createPost = async() => {
        const url = 'http://localhost:4001/post'
        let linkUrls = []
        // for (let i=0; i<linkId; ++i) {
        //     // linkNames.push(links[i][1])
        //     linkUrls.push(links[i][2])
        // }
        const new_post = {
            userId: user?.uid,
            userName: user?.displayName,
            post: post,
            // links: linkUrls,
            photoUrl: user?.photoURL    
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
        await axios.patch(url + '/' + user?.uid, update_no_posts)
            .then(
                // res => console.log(res.data)
            )
            .catch(
                err => console.log(err)
            )
    }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [post, setPost] = React.useState("")

  return (
    <div className="ModalContainer">
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <div className='TextFieldBtn'>
            <div className='FieldName'>POST</div>
            <div className='ActionBtn' onClick={handleOpen} >
                Click to Post
            </div>
        </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style} className="Modal" >
            <Typography id="transition-modal-title" variant="h6" component="h2">
            </Typography>
            <textarea
                placeholder="Write a post..."
                className="PostInput"
                onChange={ (e) => {
                    if (post.length <= 500)
                    setPost(e.target.value)
                    // else
                    // e.target.value = post
                } }
                maxLength={500}
                // style={{ height: 400, resize: 'vertical' }}
            />
            <div className="ModalEnd">
                <div>{post.length}/500</div>
                <Button 
                variant="contained" 
                endIcon={<SendIcon />} 
                onClick={
                    () => {
                        createPost()
                        handleClose()
                    }
                }
                >
                    Post
                </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

