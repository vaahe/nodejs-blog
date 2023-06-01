const express = require("express");
const router = express.Router();

const { getPosts, getPostsByAuthorId, createPost, updatePost, deletePost } = require("../controllers/postController");

router.get('/', getPosts); // get all posts
router.post('/', createPost);
router.put('/:id', updatePost);
router.get('/:id', getPostsByAuthorId); // get post by id
router.delete('/:id', deletePost);

module.exports = router;