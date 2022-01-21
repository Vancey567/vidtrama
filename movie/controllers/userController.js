const userService = require('../services/user-service');

class UserController {
    async getUser(req, res) {
        await userService.findUser(data);
    }

    async createUser(req, res) {
        await userService.createUser(data);
    }
}

module.exports = new UserController();
