const Post = require('../models/Post')

class PostService {
    async create(post) {
        const createdPost = await Post.create(post)
        return createdPost
    }

    async getAll() {
        const posts = await Post.find()
        return posts
    }

    async getOne(postId) {
        if (!postId) {
            throw new Error('Post ID is not defined')
        }
        const post = await Post.findById(postId)
        if (!post) {
            throw new Error('Post not found')
        }
        return post
    }

    async update(post) {
        if (!post._id) {
            throw new Error('Post ID is not defined')
        }
        const updatedPost = await Post.findByIdAndUpdate(post._id, post, {new: true})
        if (!updatedPost) {
            throw new Error('Post not found')
        }
        return updatedPost
    }

    async delete(postId) {
        if(!postId) {
            throw new Error('Post ID is not defined')
        }
        const deletedPost = Post.findByIdAndDelete(postId)
        if(!deletedPost) {
            throw new Error('Post not found')
        }
        return deletedPost
    }
}

module.exports = new PostService()