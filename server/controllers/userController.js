const userService = require("../service/userService");

class UserController {
  async registerUser(req, res) { // create user with "USER" or "ARTIST" roles
    try {
      const createdUser = await userService.registration(req, res);
      return res.json(createdUser);
    } catch (e) {
      return res.status(500).json({ error: true, message: e.message });
    }
  }
  async loginUser(req, res) {
    try {
      const user = await userService.login(req);
      return res.json(user);
    } catch (e) {
      return res.status(500).json({ error: true, message: e.message });
    }
  } 

  // that's for test

  // async getUsers(req, res) {
  //   try {
  //     const data = await userService.getUsers(req);
  //     return res.json(data)
  //   } catch(e) {
  //     return res.status(400).json({message: 'Smth went wrong'})
  //   }
  // }
}

module.exports = new UserController();