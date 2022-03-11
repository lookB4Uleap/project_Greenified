const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        _id: String,
        userName: String,
        userEmail: String,
        photoUrl: String,
        likes: Number,
        followers: [String],
        following: [String]
    }, { _id: false }
)

module.exports = mongoose.model('UserCollection', userSchema)