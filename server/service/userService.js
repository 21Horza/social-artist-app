const User = require("../models/User");
const Role = require("../models/Role");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')

const generateJwt = (id, wallet, roles) => {
    return jwt.sign(
        {id, wallet, roles}, // payload
        process.env.SECRET_KEY, // secret key
        {expiresIn: '2h'} // time
        )
}

class UserService {
  async registration(req, res) { // registration with "USER" or "ARTIST" role

    const errors = validationResult(req)
      if (!errors.isEmpty()) {
          return res.status(400).json({message: 'Password or username is invalid', errors})
      }

    const {username, password, wallet, is_artist} = req.body

    const candidate = await User.findOne({wallet, username});

    if (candidate) {
      throw new Error("The user already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    
    if(is_artist === 'false') {
      const userRole = await Role.findOne({value: 'USER'})
      const user = new User({username, password: hashedPassword, wallet, roles: [userRole.value]})
      await user.save()
      
      return user
    }

    if(is_artist === 'true') {
      const userRole = await Role.findOne({value: 'ARTIST'})
      const user = new User({username, password: hashedPassword, wallet, roles: [userRole.value, 'USER']})
      await user.save()

      return user
    }
  }

  async login(req, res) {
    const {wallet, password} = req.body
    console.log('wallet', wallet)
    const user = await User.findOne({wallet});
    if (!user) throw new Error("Wallet or password is invalid");

    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("Password is invalid");

    const token = generateJwt(user._id, wallet, user.roles)
    return {token: token};
  }


  //   async getUsers(req, res) {
      
  //     const users = await User.find()
  //     return users
      
  // }

  // async getUsers (req, res) {
  //   const userRole = new Role()
  //   const artistRole = new Role({value: "ARTIST"})
  //   userRole.save()
  //   artistRole.save()
  //   return {userRole, artistRole}
  // }
}

module.exports = new UserService();