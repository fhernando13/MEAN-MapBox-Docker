"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserController {
    index(req, res) {
        res.send('User');
    }
}
;
const userController = new UserController();
exports.default = userController;
