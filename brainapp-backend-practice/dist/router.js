"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const zod_1 = __importStar(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const JWT_SECRET = "jajalkjfaldjjkfgdhajk";
exports.userRouter = (0, express_1.Router)();
const userInput = zod_1.default.object({
    name: (0, zod_1.string)().min(4).max(10),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)()
});
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const inputValidation = userInput.safeParse(req.body);
    if (!inputValidation.success) {
        res.status(400).json({
            message: "invalid input format",
            error: inputValidation.error
        });
        return;
    }
    const userAlreadyPresent = yield db_1.userModel.findOne({
        name: name
    });
    if (userAlreadyPresent) {
        res.status(300).json({
            message: "user already exist",
        });
        return;
    }
    const hashPassword = yield bcrypt_1.default.hash(password, 5);
    yield db_1.userModel.create({
        name: name,
        email: email,
        password: hashPassword
    });
    res.status(200).json({
        message: "you signedup successfully"
    });
}));
exports.userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const user = yield db_1.userModel.findOne({
        name: name,
        email: email
    });
    if (!user) {
        res.json(400).json({
            message: "user doesnt exist"
        });
        return;
    }
    const decodedPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!decodedPassword) {
        res.status(400).json({
            message: "invalid password"
        });
        return;
    }
    else {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).json({
            message: "you signin successfully",
            token: token
        });
    }
}));
exports.userRouter.post('/content', middleware_1.authtentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const user = yield db_1.userModel.findOne({
        _id: userId
    });
    if (!user) {
        res.status(400).json({
            message: "user is not logedin"
        });
        return;
    }
    else {
        const { title, link, type } = req.body;
        yield db_1.contentModel.create({
            title: title,
            link: link,
            type: type,
            userId: userId
        });
        res.status(200).json({
            message: "content created successfully"
        });
    }
}));
exports.userRouter.get('/content', middleware_1.authtentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const user = yield db_1.userModel.findOne({
        _id: userId
    });
    if (!user) {
        res.status(400).json({
            message: "user not logedin"
        });
        return;
    }
    else {
        const content = yield db_1.contentModel.find({
            userId: userId
        });
        res.status(200).json({
            message: "your content is",
            content: content
        });
    }
}));
exports.userRouter.delete('/content', middleware_1.authtentication, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
}));
