const pool = require('../config/database');
const Post = require('../models/post');

const getPosts = async (req, res) => {
    const posts = await Post.getPosts();
    return res.status(200).json(posts);
}

const getPostsByAuthorId = async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await Post.getPostsByAuthorId([id]);

    return res.json(post);
}

const createPost = async (req, res) => {
    const createdAt = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', ' ');

    const { title, content, authorId } = req.body;
    const post = await Post.createPost([title, content, authorId, createdAt]);

    res.status(201).send(`Post added from author with ${authorId} id`);

    return res.json(post);
}

const updatePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    let { title, content } = req.body;

    const isPostExists = await pool.query('SELECT * FROM posts WHERE id = $1', [postId]);

    if (!isPostExists.rowCount) {
        return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await Post.updatePost([title, content, postId]);

    res.status(200).send(`Post modified with ID: ${postId}`);
    return res.json(updatedPost);
}

const deletePost = async (req, res) => {
    const id = parseInt(req.params.id);

    await Post.deletePost([id]);

    res.status(200).send(`Post deleted with ID: ${id}`);
}

module.exports = { getPosts, getPostsByAuthorId, createPost, updatePost, deletePost };