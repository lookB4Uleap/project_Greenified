const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        photoUrl: {
            type: String,
        },
        post: {
            type: String,
            required: true
        },
        likes: {
            type: Number,
            required: true,
            default: 0
        },
        score: {
            type: Number,
            required: true,
            default: 0
        },
        likedBy: {
            type: [String],
            required: true,
            default: []
        },
        dateOfCreation: {
            type: Date,
            required: true,
            default: Date.now
        },
        comments: [
            {
                body: String,
                userId: String,
                dateOfCreation: Date,
            }
        ]
    }
)

module.exports = mongoose.model('PostCollection', postSchema)