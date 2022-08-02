const likesService = require('../service/likesService')

class LikesController {
    async increment(req, res) {
      try {
        const likesLength = await likesService.increment(req);
        return res.json(likesLength);
      } catch (e) {
        return res.status(500).json({ error: true, message: e.message });
      }
    }
    async decrement(req, res) {
      try {
        const likesLength = await likesService.decrement(req);
        return res.json(likesLength);
      } catch (e) {
        return res.status(500).json({ error: true, message: e.message });
      }
    }
  }
  
module.exports = new LikesController();