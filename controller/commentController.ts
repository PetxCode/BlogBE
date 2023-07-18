import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import postModel from "../model/postModel";
import authModel from "../model/authModel";
import mongoose from "mongoose";
import commentModel from "../model/commentModel";

export const createComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { authID, postID } = req.params;
    const { comment } = req.body;

    const user: any = await authModel.findById(authID);
    const post: any = await postModel.findById(postID);

    const commentData: any = await commentModel.create({
      comment,
      userName: user.userName,
      userAvatar: user.avatar,
    });

    post?.comments?.push(new mongoose.Types.ObjectId(commentData._id!));
    post?.save();

    return res.status(201).json({
      message: "comment created",
      data: commentData,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to create comment",
    });
  }
};

export const readComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const post = await commentModel.find();

    return res.status(200).json({
      message: "read comment",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read comemnt",
    });
  }
};

export const readOneComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { commentID } = req.params;
    const post = await commentModel.findById(commentID);

    return res.status(200).json({
      message: "read comment",
      data: post,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read comment",
    });
  }
};

export const readPostComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { postID } = req.params;
    const post = await postModel.findById(postID).populate({
      path: "comments",
      options: {
        sort: {
          createAt: -1,
        },
      },
    });

    return res.status(200).json({
      message: "read post comment",
      data: post?.comments,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts comment",
    });
  }
};

export const likePostComment = async (req: Request, res: Response) => {
  try {
    const { authID, commentID } = req.params;

    const auth: any = await authModel.findById(authID);
    const comment: any = await commentModel.findById(commentID);

    if (auth) {
      comment?.likes?.push(new mongoose.Types.ObjectId(auth._id!));
      comment?.save();

      return res.status(201).json({
        message: "like a comment",
        length: comment?.likes.length,
        data: comment,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to like Posts comment",
    });
  }
};

export const unLikePostComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { authID, commentID } = req.params;

    const auth: any = await authModel.findById(authID);
    const comment: any = await commentModel.findById(commentID);

    if (auth) {
      comment?.likes?.pull(new mongoose.Types.ObjectId(auth._id!));
      comment?.save();

      return res.status(201).json({
        message: "unlike a Post comment",
        data: comment,
        length: comment?.likes.length,
      });
    } else {
      return res.status(404).json({
        message: "Error",
      });
    }
  } catch (error) {
    return res.status(404).json({
      message: "Unable to unlike a Posts comment",
    });
  }
};

export const deleteOneComment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { postID, commentID } = req.params;
    const post: any = await postModel.findByIdAndDelete(postID);
    const comment: any = await commentModel.findByIdAndDelete(commentID);

    post?.comments?.pull(new mongoose.Types.ObjectId(commentID));
    post.save();

    return res.status(201).json({
      message: "read Post comment",
      data: comment,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Unable to read Posts",
    });
  }
};
