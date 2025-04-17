"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tagModel = exports.linkModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: String,
    email: String,
    password: String
});
const contentSchema = new Schema({
    title: String,
    link: String,
    type: String,
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: "user" },
});
const linkSchema = new Schema({
    hash: String,
    userId: { type: mongoose_1.default.Schema.ObjectId, ref: 'user' }
});
const tagSchema = new Schema({
    title: String
});
exports.userModel = mongoose_1.default.model('user', userSchema);
exports.contentModel = mongoose_1.default.model('content', contentSchema);
exports.linkModel = mongoose_1.default.model('link', linkSchema);
exports.tagModel = mongoose_1.default.model('tags', tagSchema);
