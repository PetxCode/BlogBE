import express, { Router } from "express";
import {
  createComment,
  deleteOneComment,
  likePostComment,
  readComment,
  readOneComment,
  readPostComment,
  unLikePostComment,
} from "../controller/commentController";

const router: Router = express.Router();

router.route("/:authID/:postID/create-comment").post(createComment);

router.route("/comments").get(readComment);

router.route("/:commentID/comment-detail").get(readOneComment);

router.route("/:postID/read-post-comment").get(readPostComment);

router.route("/:authID/:commentID/like-comment").patch(likePostComment);

router.route("/:authID/:commentID/unlike-comment").patch(unLikePostComment);

router.route("/:postID/:commentID/delete-comment").delete(deleteOneComment);

export default router;
