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
exports.deleteOneComment = exports.unLikePostComment = exports.likePostComment = exports.readPostComment = exports.readOneComment = exports.readComment = exports.createComment = void 0;
const postModel_1 = __importDefault(require("../model/postModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const commentModel_1 = __importDefault(require("../model/commentModel"));
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { authID, postID } = req.params;
        const { comment } = req.body;
        const user = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        const commentData = yield commentModel_1.default.create({
            comment,
            userName: user.userName,
            userAvatar: user.avatar,
        });
        (_a = post === null || post === void 0 ? void 0 : post.comments) === null || _a === void 0 ? void 0 : _a.push(new mongoose_1.default.Types.ObjectId(commentData._id));
        post === null || post === void 0 ? void 0 : post.save();
        return res.status(201).json({
            message: "comment created",
            data: commentData,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to create comment",
        });
    }
});
exports.createComment = createComment;
const readComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield commentModel_1.default.find();
        return res.status(200).json({
            message: "read comment",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read comemnt",
        });
    }
});
exports.readComment = readComment;
const readOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentID } = req.params;
        const post = yield commentModel_1.default.findById(commentID);
        return res.status(200).json({
            message: "read comment",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read comment",
        });
    }
});
exports.readOneComment = readOneComment;
const readPostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID).populate({
            path: "comments",
            options: {
                sort: {
                    createAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "read post comment",
            data: post === null || post === void 0 ? void 0 : post.comments,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts comment",
        });
    }
});
exports.readPostComment = readPostComment;
const likePostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { authID, commentID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const comment = yield commentModel_1.default.findById(commentID);
        if (auth) {
            (_b = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(auth._id));
            comment === null || comment === void 0 ? void 0 : comment.save();
            return res.status(201).json({
                message: "like a comment",
                length: comment === null || comment === void 0 ? void 0 : comment.likes.length,
                data: comment,
            });
        }
        else {
            return res.status(404).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to like Posts comment",
        });
    }
});
exports.likePostComment = likePostComment;
const unLikePostComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { authID, commentID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const comment = yield commentModel_1.default.findById(commentID);
        if (auth) {
            (_c = comment === null || comment === void 0 ? void 0 : comment.likes) === null || _c === void 0 ? void 0 : _c.pull(new mongoose_1.default.Types.ObjectId(auth._id));
            comment === null || comment === void 0 ? void 0 : comment.save();
            return res.status(201).json({
                message: "unlike a Post comment",
                data: comment,
                length: comment === null || comment === void 0 ? void 0 : comment.likes.length,
            });
        }
        else {
            return res.status(404).json({
                message: "Error",
            });
        }
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to unlike a Posts comment",
        });
    }
});
exports.unLikePostComment = unLikePostComment;
const deleteOneComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { postID, commentID } = req.params;
        const post = yield postModel_1.default.findByIdAndDelete(postID);
        const comment = yield commentModel_1.default.findByIdAndDelete(commentID);
        (_d = post === null || post === void 0 ? void 0 : post.comments) === null || _d === void 0 ? void 0 : _d.pull(new mongoose_1.default.Types.ObjectId(commentID));
        post.save();
        return res.status(201).json({
            message: "read Post comment",
            data: comment,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.deleteOneComment = deleteOneComment;
