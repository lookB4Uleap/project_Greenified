require('dotenv').config()
const express = require('express')
const router = express.Router()

var axios = require("axios").default

var options = {
    method: 'GET',
    url: process.env.NEWS_URL,
    params: {
        q: 'environmental pollution',
        // country: 'US',
        lang: 'en',
        // source: 'cnn.com',
        // limit: '50',
        // when: '30d'
    },
    headers: {
        'x-rapidapi-host': process.env.NEWS_API_HOST,
        'x-rapidapi-key': process.env.NEWS_API_KEY
    }
}

router.get('/', async (req, res) => {
    axios.request(options).then(function (response) {
        console.log(response.data)
        res.json(response.data)
    }).catch(function (error) {
        // console.error(error)
        res.status(500).json({ message: error })
    })
})

module.exports = router