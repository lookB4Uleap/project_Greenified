const express = require('express')
const router = express.Router()
const User = require('../models/user-collection')

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a particular user
router.get('/:id', getUser, async (req, res) => {
    try {
        res.status(200).json(res.user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Update total posts and total likes

// Follow a user
router.post('/follow/:id', getUser, async (req, res) => {
    try {
        res.user.followers.push(req.body.followerId)
        const user = await User.findById(req.body.followerId)
        user.following.push(req.params.id)
        const updatedUserFollowing = await res.user.save()
        const updatedUserFollower = await user.save()
        res.status(200).json({ updatedUserFollower, updatedUserFollowing })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// Create/resgister new user
router.post('/', async (req, res) => {
    const user = new User({
        _id: req.body.userId,
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        photoUrl: req.body.photoUrl,
        followers: [],
        following: []
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

async function getUser(req, res, next) {
    let user
    try {
        user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.user = user
    next()
}

module.exports = router