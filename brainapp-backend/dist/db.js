"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.conntentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.ObjectId;
const userSchema = new Schema({
    name: { type: String, unique: true },
    password: String
});
const contentSchema = new Schema({
    title: String,
    link: String,
    contenttype: { type: String },
    tags: [{ type: ObjectId, ref: "tags" }],
    userId: { type: ObjectId, ref: "user" }
});
const tagSchema = new Schema({
    title: String
});
const linkSchema = new Schema({
    hash: String,
    userId: { type: ObjectId, ref: "user" }
});
exports.userModel = mongoose_1.default.model("user", userSchema);
exports.conntentModel = mongoose_1.default.model("content", contentSchema);
exports.tagModel = mongoose_1.default.model('tags', tagSchema);
exports.linkModel = mongoose_1.default.model('link', linkSchema);
