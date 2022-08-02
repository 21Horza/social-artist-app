const postController = require('../controllers/postController')
const verifyRole = require('../middlewares/verifyRole')

const Router = require('express').Router
const postRouter = new Router()

postRouter.get('/post', postController.getAllPosts)
postRouter.get('/post/:id', postController.getOnePost)
postRouter.post('/post', verifyRole(['ARTIST']), postController.createPost)
postRouter.put('/post', verifyRole(['ARTIST']), postController.updatePost)
postRouter.delete('/post/:id', verifyRole(['ARTIST']), postController.deletePost)

module.exports = postRouter