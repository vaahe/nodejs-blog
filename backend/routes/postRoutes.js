const express = require("express");
const router = express.Router();

const { getPosts, getPostsById, createPost, updatePost, deletePost } = require("../controllers/postController");

router.get('/', getPosts); // get all posts
router.post('/', createPost);
router.put('/:id', updatePost);
router.get('/:id', getPostsById); // get post by id
router.delete('/:id', deletePost);

module.exports = router;