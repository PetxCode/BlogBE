"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controller/postController");
const multer_1 = require("../config/multer");
const router = express_1.default.Router();
router.route("/:authID/create").post(multer_1.upload, postController_1.createPost);
router.route("/posts").get(postController_1.readPost);
router.route("/:postID/post-detail").get(postController_1.readOnePost);
router.route("/:authID/read-user-post").get(postController_1.readUserPost);
router.route("/:postID/update-post").patch(postController_1.UpdateOnePost);
router.route("/:postID/delete-post").delete(postController_1.deleteOnePost);
router.route("/:authID/:postID/unlike-post").patch(postController_1.unLikePost);
router.route("/:authID/:postID/like-post").patch(postController_1.likePost);
router.route("/:authID/:postID/view-post").patch(postController_1.viewPost);
exports.default = router;
