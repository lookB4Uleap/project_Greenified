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
            required: true
        },
        post: {
            type: String,
            required: true
        },
        linkNames: {
            type: [String],
            required: true,
            default: []
        },
        links: {
            type: [String],
            required: true,
            default: []
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
        }
    }
)

module.exports = mongoose.model('Post', postSchema)