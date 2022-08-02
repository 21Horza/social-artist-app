const User = require("../models/User")
const Post = require('../models/Post')
const jwt = require('jsonwebtoken')

class LikesService {
    async increment(req, res) {

        const token = req.headers.authorization.split(' ')[1]
        req.decoded = jwt.verify(token, process.env.SECRET_KEY)

        const post = await Post.findById(req.params.postId)
        
        if(!post) {
            throw new Error('Post not found')
        }

        const user = await User.findById(req.decoded.id)
        console.log(user)
        console.log('items', post)
        const foundUser = post.likes.find((item) => item === user.wallet);

        if (!foundUser) {
            post.likes.push(user.wallet);
            await post.save();
            return post.likes.length;
        } else {
            throw new Error('You already liked the post')
        }
    }

    async decrement(req) {
        
        const token = req.headers.authorization.split(' ')[1]
        req.decoded = jwt.verify(token, process.env.SECRET_KEY)

        const post = await Post.findById(req.params.postId);

        if(!post) {
            throw new Error('Post not found')
        }

        const user = await User.findById(req.decoded.id);
        const foundUser = post.likes.find((item) => item === user.wallet);
        
        if (foundUser) {
            post.likes.splice(post.likes.indexOf(user.wallet), 1);
            await post.save();
            return post.likes.length;
        } else {
            throw new Error('You already disliked the post')
        }
    }
}

module.exports = new LikesService()