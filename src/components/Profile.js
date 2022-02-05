import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import url from 'url'

const Profile = () => {
    const location = useLocation()
    const history = useHistory()
    const URL = 'http://localhost:4001/user/'
    const [profile, setProfile] = useState({})

    useEffect(() => {
        const query = url.parse(location.search, true).query
        // console.log(location)
        console.log(query)

        if (query.id)
            axios.get(URL + query.id)
                .then((res) => {
                    // console.log(res.data)
                    setProfile(res.data)
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
            {profile._id}
        </main>
    )
}

export default Profile