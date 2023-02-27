"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.json({ 'text': 'Api/user' });
    }
}
;
const indexController = new IndexController();
exports.default = indexController;
