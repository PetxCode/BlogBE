"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const commentModel = new mongoose_1.default.Schema({
    comment: {
        type: String,
    },
    userName: {
        type: String,
    },
    userAvatar: {
        type: String,
    },
    likes: [
        {
            type: mongoose_1.default.Types.ObjectId,
            ref: "auths",
        },
    ],
    post: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "posts",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("comments", commentModel);
