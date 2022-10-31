import { Router } from "express";
import addComment from "../services/comments/addComment.js";
import deleteComment from "../services/comments/deleteComment.js";
import getInsights from "../services/insights/getInsights.js";
import getLeaderBoard from "../services/insights/getLeaderboard.js";
import addPost from "../services/posts/addPost.js";
import deletePost from "../services/posts/deletePost.js";
import getPosts from "../services/posts/getPosts.js";
import likePost from "../services/posts/likePost.js";
import updatePost from "../services/posts/updatePost.js";
import getTags from "../services/tags/getTags.js";
import addUser from "../services/users/addUser.js";
import getUsers from "../services/users/getUsers.js";

const router = Router();

//Posts
router.post("/posts", addPost);
router.get("/posts/:postId?", getPosts);
router.put("/posts/:postId", updatePost);
router.delete("/posts/:postId", deletePost);
router.post("/posts/:postId/like", likePost);

//Comment
router.post("/post/:postId/comment", addComment);
router.delete("/post/:postId/comment/:commentId", deleteComment);

//Tags
router.get("/tags", getTags);

//Users
router.post("/users", addUser);
router.get("/users/:userEmail?", getUsers);

//Insights
router.get("/leaderBoard", getLeaderBoard);
router.get("/getInsights", getInsights);


export default router;