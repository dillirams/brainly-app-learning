"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = " userauthentication";
function authentication(req, res, next) {
    const token = req.headers.token;
    const decodedId = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    //@ts-ignore
    if (decodedId) {
        //@ts-ignore
        req.id = decodedId.id;
        next();
    }
    else {
        res.status(400).json({
            message: 'invalid user'
        });
        return;
    }
}
exports.default = authentication;
