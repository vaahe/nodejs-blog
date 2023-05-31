const pool = require('../config/database');
const Post = require('../models/post');

const getPosts = async (req, res) => {
    const posts = await Post.getPosts();
    return res.status(200).json(posts);
}

const getPostsById = async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await Post.getPostsById([id]);

    return res.json(post);
}

const createPost = async (req, res) => {
    const createdAt = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', ' ');
    console.log(req.body);
    const { title, content, authorId } = req.body;
    // console.log(title, content, authorId)
    // const post = await Post.createPost([title, content, authorId, createdAt]);

    // res.sendStatus(201).sendStatus(`Post added from author with ${authorId} id`);
    // return res.json(post);
}

const updatePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    let { title, content } = req.body;

    const isPostExists = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    if (!isPostExists.rowCount) {
        return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.updatePost([title, content, postId]);

    res.status(200).sendStatus(`Post modified with ID: ${postId}`);
    return res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);

    const deletedPost = await Post.deletePost([id]);
    console.log(deletedPost);
    res.sendStatus(200).send(`Post deleted from user #${id}`);
    res.json(deletedPost);
}

module.exports = { getPosts, getPostsById, createPost, updatePost, deletePost };