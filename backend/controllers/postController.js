const Joi = require('joi');
const Post = require('../models/post');


const getPosts = async (req, res) => {
    try {
        const posts = await Post.getPosts();

        if (!posts) {
            return res.status(404).json({ message: 'Posts not found' });
        }

        return res.status(200).json(posts);
    } catch (error) {
        console.error('Error retrieving posts:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getPostsByAuthorId = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id <= 1) {
        return res.status(404).json({ message: 'Invalid author ID' });
    }

    try {
        const post = await Post.getPostsByAuthorId(id);

        if (!post.length) {
            return res.status(404).json({ message: `Posts not found from user with ${id} ID` });
        }

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error retrieving post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const createPost = async (req, res) => {
    const createdAt = new Date(Date.now()).toISOString().replace('T', ' ').replace('Z', ' ');

    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required(),
        authorId: Joi.any().required()
    });

    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { title, content, authorId } = req.body;

        const post = await Post.createPost([title, content, authorId, createdAt]);

        return res.status(201).json({ message: `Post created from author with ${authorId} id`, post: post });
    } catch (error) {
        console.error('Error during creation of post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const updatePost = async (req, res) => {
    const postId = req.params.id;

    if (isNaN(postId) || postId <= 1) {
        return res.status(404).json({ message: 'Invalid post Id' });
    }

    const schema = Joi.object({
        title: Joi.string().required(),
        content: Joi.string().required()
    });

    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(404).json({ message: error.details[0].message });
        }

        let { title, content } = req.body;
        const existedPost = await Post.findById(postId);

        if (!existedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const updatedPost = await Post.updatePost([title, content, postId]);

        return res.status(200).json({ message: `Post modified with ID: ${postId}`, post: updatedPost });
    } catch (error) {
        console.error('Error during updating of post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deletePost = async (req, res) => {
    const postId = req.params.id;

    if (isNaN(postId) || postId <= 1) {
        return res.status(404).json({ message: 'Invalid post ID' });
    }

    try {
        const existedPost = await Post.findById(postId);

        if (!existedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const deletedPost = await Post.deletePost([postId]);

        return res.status(200).json({ message: `Post deleted with ID: ${postId}`, post: deletedPost });
    } catch (error) {
        console.error('Error during deletion of post:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { getPosts, getPostsByAuthorId, createPost, updatePost, deletePost };