"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
class UserController {
    index(req, res) {
        res.send('User');
    }
}
;
exports.userController = new UserController();
