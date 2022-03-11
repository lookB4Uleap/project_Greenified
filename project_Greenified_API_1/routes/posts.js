const express = require('express')
const router = express.Router()
// const Post = require('../models/post')
const Post = require('../models/post-collection')

// Get top 3 or 5 posts
router.get('/', async (req, res) => {
    try {
        const sort = { likes: -1, score: -1 }
        const posts = await Post.find().sort(sort)
        // posts.sort(
        //     (a, b) => {
        //         return (b.likes + b.score) - (a.likes + a.score) 
        //     }
        // )
        let respond = []
        for (let i = 0; i < 10; ++i)
            respond.push(posts[i])
        res.json(respond)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get all post of a certain user
router.get('/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.params.userId }).sort({ dateOfCreation: -1 })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get a specific post
router.get('/specificPost/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Create a post
router.post('/', async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        userName: req.body.userName,
        post: req.body.post,
        photoUrl: req.body.photoUrl
    })

    const data = {
        userId: req.body.userId,
        post: req.body.post
    }

    try {
        // fetch('https://projectGreenifiedAPI4.anishsarkar.repl.co/api/score', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => response.json())
        //     .then(data => console.log('Success', data))
        //     .catch(err => console.log(err))
        const newPost = await post.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Updating Like
router.post('/incLike/:id', getPost, async (req, res) => {
    let len = res.post.likedBy.length
    res.post.likes += req.body.like
    if (req.body.like === 1)
        res.post.likedBy.push(req.body.userId)
    else if (req.body.like === -1) {
        for (let i = 0; i < len; i += 1) {
            if (res.post.likedBy[i] === req.body.userId)
                res.post.likedBy.splice(i, i + 1)
        }
    }
    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Adding a comment
router.post('/comment/:id', getPost, async (req, res) => {
    // let len = res.post.likedBy.length
    // res.post.likes += req.body.like
    // if (req.body.like === 1)
    // res.post.likedBy.push(req.body.userId)
    // else if (req.body.like === -1) {
    //     for (let i=0; i<len; i+=1) {
    //         if (res.post.likedBy[i] === req.body.userId)
    //         res.post.likedBy.splice(i, i+1)
    //     }
    // }
    const date = new Date()
    const comment = {
        userId: req.body.userId,
        body: req.body.body,
        dateOfCreation: date
    }
    // console.log(comment)
    res.post.comments.push(comment)

    try {
        const updatedPost = await res.post.save()
        res.json(updatedPost)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


// Delete a post
router.delete('/:id', getPost, async (req, res) => {
    try {
        await res.post.remove()
        res.json({ message: 'Post Deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getPost(req, res, next) {
    let post;
    try {
        post = await Post.findById(req.params.id)
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    res.post = post
    next()
}

module.exports = router