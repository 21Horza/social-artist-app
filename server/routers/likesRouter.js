const likesController = require('../controllers/likesController')
const verifyRole = require('../middlewares/verifyRole')

const Router = require('express').Router
const likesRouter = new Router()

likesRouter.post('/likes/:postId', verifyRole(["USER"]), likesController.increment)
likesRouter.delete('/likes/:postId', verifyRole(["USER"]),  likesController.decrement)

module.exports = likesRouter