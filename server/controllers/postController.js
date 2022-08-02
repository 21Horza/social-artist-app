const postService = require('../service/postService')

class PostController {
    
    async createPost(req, res) {
        try {
            const created = await postService.create(req.body)
            return res.json(created)
        } catch(e) {
            return res.status(500).json({error: true, message: e.message})
        }
    }

    async updatePost(req, res) {
        try {
            const updatedPost = await postService.update(req.body)
                return res.json(updatedPost)
        } catch(e) {
            return res.status(500).json({error: true, message: e.message})
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await postService.getAll()
            return res.json(posts)
        } catch(e) {
            return res.status(500).json({error: true, message: e.message})
        }
    }

    async getOnePost(req, res) {
        try {
            const post = await postService.getOne(req.params.id)
            return res.json(post)
        }
        catch(e) {
            return res.status(500).json({error: true, message: e.message})
        }
    }

    async deletePost(req, res) {
        try {
            const deletedPost = await postService.delete(req.params.id)
            return res.json(deletedPost)
        } catch(e) {
            return res.status(500).json({error: true, message: e.message})
        }
    }
}

module.exports = new PostController()