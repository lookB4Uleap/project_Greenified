import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import url from 'url'

const PostDetails = () => {
    const location = useLocation()
    const history = useHistory()
    const URL = 'http://localhost:4001/post/specificPost/'
    const [post, setPost] = useState({})

    useEffect(() => {
        const query = url.parse(location.search, true).query
        // console.log(location)
        console.log(query)

        if (query.id)
            axios.get(URL + query.id)
                .then((res) => {
                    // console.log(res.data)
                    setPost(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        else {
            alert('Post Id not found')
            history.replace("/")
        }
    }, [])

    return (
        <main id="home-container">
            {post._id}
        </main>
    )
}

export default PostDetails