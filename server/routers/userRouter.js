const userRouter = require("express").Router();
const userController = require("../controllers/userController");
const {check} = require('express-validator')

userRouter.post("/registration", 
[
    check('username', 'Username can not be empty').notEmpty(),
    check('password', "Password can not be less than 6 and less than 12 characters").isLength({min: 6, max: 12})
],
userController.registerUser);
userRouter.post("/login", userController.loginUser);

module.exports = userRouter;