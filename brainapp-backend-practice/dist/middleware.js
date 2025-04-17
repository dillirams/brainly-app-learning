"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authtentication = authtentication;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "jajalkjfaldjjkfgdhajk";
function authtentication(req, res, next) {
    const token = req.headers.token;
    const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    if (decodedToken) {
        //@ts-ignore
        req.id = decodedToken.id;
        next();
    }
    else {
        //ts-ignore
        res.status(400).json({
            message: "invalid user"
        });
        return;
    }
}
