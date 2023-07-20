import express from "express";
import mongoose from "mongoose";

interface iPost {
  title?: string;
  content?: string;
  image?: string;
  imageID?: string;
  category?: string;
  userID?: string;
  likes?: [];
  comments?: [];
  views?: Array<string>;
  user?: {};
}

interface iPostData extends iPost, mongoose.Document {}

const postModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    imageID: {
      type: String,
    },
    userID: {
      type: String,
    },
    views: {
      type: Array<String>,
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "auths",
      },
    ],
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: "comments",
      },
    ],
    category: {
      type: String,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
  },
  { timestamps: true },
);

export default mongoose.model<iPostData>("posts", postModel);
