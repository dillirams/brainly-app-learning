"use strict";
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
const express_1 = require("express");
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = " userauthentication";
const db_1 = require("./db");
const middleware_1 = __importDefault(require("./middleware"));
const util_1 = require("./util");
const userRouter = (0, express_1.Router)();
const requestBody = zod_1.default.object({
    name: zod_1.default.string().min(3, { message: "the minimum length is 3" }),
    password: zod_1.default.string().min(4, { message: "min 4" }).max(8, { message: "max length of 8" })
});
userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const inputValidation = requestBody.safeParse(req.body);
    if (!inputValidation.success) {
        res.status(400).json({
            message: "invalid input format",
            error: inputValidation.error
        });
        return;
    }
    const user = yield db_1.userModel.findOne({
        name: name
    });
    if (user) {
        res.status(300).json({
            message: "user already exsit"
        });
        return;
    }
    const hasedPassword = yield bcrypt_1.default.hash(password, 5);
    yield db_1.userModel.create({
        name: name,
        password: hasedPassword
    });
    res.status(200).json({
        message: "you signed up successfully"
    });
}));
userRouter.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password } = req.body;
    const user = yield db_1.userModel.findOne({
        name: name,
    });
    if (!user) {
        res.status(400).json({
            message: "user doesnt exsit, please signup"
        });
        return;
    }
    const decodedPassword = yield bcrypt_1.default.compare(password, user.password);
    if (decodedPassword) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, JWT_SECRET);
        res.status(200).json({
            message: "you are  signed in",
            token: token
        });
    }
    else {
        res.status(400).json({
            message: "invalid password"
        });
    }
}));
userRouter.post('/content', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const user = yield db_1.userModel.findOne({
        _id: userId
    });
    if (!user) {
        res.status(411).json({
            message: "you are not logedin"
        });
        return;
    }
    const { title, link, contenttype } = req.body;
    yield db_1.conntentModel.create({
        title: title,
        link: link,
        contenttype: contenttype,
        userId: userId
    });
    res.status(200).json({
        message: "content created successfully"
    });
}));
userRouter.get('/content', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const userId = req.id;
    const content = yield db_1.conntentModel.find({
        userId: userId
    }).populate("userId");
    if (content) {
        res.status(200).json({
            content
        });
    }
    else {
        res.status(411).json({
            message: "you are not signed up"
        });
    }
}));
userRouter.delete('/content', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.id;
    try {
        yield db_1.conntentModel.deleteOne({
            _id: contentId,
            userId: userId
        });
        res.status(200).json({
            message: "content deleted successfully"
        });
    }
    catch (e) {
        res.status(400).json({
            message: "couldnt delete the content"
        });
        return;
    }
}));
userRouter.post('/share', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { share } = req.body;
    const linkPresent = yield db_1.linkModel.findOne({
        //@ts-ignore
        userId: req.id
    });
    if (share && (linkPresent === null || linkPresent === void 0 ? void 0 : linkPresent.hash)) {
        res.status(200).json({
            message: "the shared link is",
            link: linkPresent.hash
        });
        return;
    }
    else if (share && (!(linkPresent === null || linkPresent === void 0 ? void 0 : linkPresent.hash))) {
        const hashString = (0, util_1.hashLink)(10);
        yield db_1.linkModel.create({
            hash: hashString,
            //@ts-ignore
            userId: req.id
        });
        res.status(200).json({
            message: "shared link is",
            link: hashString
        });
        return;
    }
    else {
        yield db_1.linkModel.deleteOne({
            //@ts-ignore
            userId: req.id
        });
        res.status(200).json({
            message: "link deleted successfully"
        });
        return;
    }
}));
userRouter.get('/share', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const { hash } = req.body;
    const link = yield db_1.linkModel.findOne({
        hash: hash
    });
    if (!link) {
        res.status(411).json({
            message: "no link found"
        });
        return;
    }
    const user = yield db_1.userModel.findOne({
        _id: link.userId
    });
    const content = yield db_1.conntentModel.find({
        userId: link.userId
    });
    res.status(200).json({
        //@ts-ignore
        user: user._id,
        message: "the content is",
        content: content
    });
}));
exports.default = userRouter;
