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
exports.deleteOnePost = exports.unLikePost = exports.viewPost = exports.likePost = exports.UpdateOnePost = exports.readUserPost = exports.readOnePost = exports.readPost = exports.createPost = void 0;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const postModel_1 = __importDefault(require("../model/postModel"));
const authModel_1 = __importDefault(require("../model/authModel"));
const mongoose_1 = __importDefault(require("mongoose"));
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { authID } = req.params;
        const { title, content, category } = req.body;
        const user = yield authModel_1.default.findById(authID);
        const { public_id, secure_url } = yield cloudinary_1.default.uploader.upload((_a = req.file) === null || _a === void 0 ? void 0 : _a.path);
        const post = yield postModel_1.default.create({
            title,
            content,
            category,
            image: secure_url,
            imageID: public_id,
            user: user,
        });
        (_b = user === null || user === void 0 ? void 0 : user.post) === null || _b === void 0 ? void 0 : _b.push(new mongoose_1.default.Types.ObjectId(post._id));
        user === null || user === void 0 ? void 0 : user.save();
        return res.status(201).json({
            message: "post created",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to create post",
        });
    }
});
exports.createPost = createPost;
const readPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel_1.default.find();
        return res.status(200).json({
            message: "read Post",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.readPost = readPost;
const readOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findById(postID);
        return res.status(200).json({
            message: "read Post",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.readOnePost = readOnePost;
const readUserPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authID } = req.params;
        const post = yield authModel_1.default.findById(authID).populate({
            path: "post",
            options: {
                sort: {
                    createAt: -1,
                },
            },
        });
        return res.status(200).json({
            message: "read Post",
            data: post === null || post === void 0 ? void 0 : post.post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.readUserPost = readUserPost;
const UpdateOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const { postID } = req.params;
        const post = yield postModel_1.default.findByIdAndUpdate(postID, { title, content }, { new: true });
        return res.status(201).json({
            message: "read Post",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.UpdateOnePost = UpdateOnePost;
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { authID, postID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        if (auth) {
            (_c = post === null || post === void 0 ? void 0 : post.likes) === null || _c === void 0 ? void 0 : _c.push(new mongoose_1.default.Types.ObjectId(auth._id));
            post === null || post === void 0 ? void 0 : post.save();
            return res.status(201).json({
                message: "like a Post",
                length: post === null || post === void 0 ? void 0 : post.likes.length,
                data: post,
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
            message: "Unable to like Posts",
        });
    }
});
exports.likePost = likePost;
const viewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { authID, postID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        if (auth) {
            (_d = post === null || post === void 0 ? void 0 : post.views) === null || _d === void 0 ? void 0 : _d.push(new mongoose_1.default.Types.ObjectId(auth._id));
            post === null || post === void 0 ? void 0 : post.save();
            return res.status(201).json({
                message: "view a Post",
                data: post === null || post === void 0 ? void 0 : post.views.length,
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
            message: "Unable to view Posts",
        });
    }
});
exports.viewPost = viewPost;
const unLikePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const { authID, postID } = req.params;
        const auth = yield authModel_1.default.findById(authID);
        const post = yield postModel_1.default.findById(postID);
        if (auth) {
            (_e = post === null || post === void 0 ? void 0 : post.likes) === null || _e === void 0 ? void 0 : _e.pull(new mongoose_1.default.Types.ObjectId(auth._id));
            post === null || post === void 0 ? void 0 : post.save();
            return res.status(201).json({
                message: "unlike a Post",
                data: post,
                length: post === null || post === void 0 ? void 0 : post.likes.length,
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
            message: "Unable to unlike a Posts",
        });
    }
});
exports.unLikePost = unLikePost;
const deleteOnePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postID } = req.params;
        const post = yield postModel_1.default.findByIdAndDelete(postID);
        return res.status(201).json({
            message: "read Post",
            data: post,
        });
    }
    catch (error) {
        return res.status(404).json({
            message: "Unable to read Posts",
        });
    }
});
exports.deleteOnePost = deleteOnePost;
