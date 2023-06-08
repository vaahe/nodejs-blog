const pool = require("../config/database");


class Post {
    static async getPosts(params) {
        const res = await pool.query('SELECT * FROM posts ORDER BY createdat DESC', params);

        return res.rows;
    }

    static async getPostsByAuthorId(params) {
        const res = await pool.query('SELECT * FROM posts WHERE authorid = $1 ORDER BY createdat DESC', [params]);

        return res.rows;
    }

    static async findById(params) {
        const res = await pool.query('SELECT * FROM posts WHERE id = $1', [params]);

        return res.rows[0];
    }

    static async createPost(params) {
        const res = await pool.query('INSERT INTO posts (title, content, authorid, createdat) VALUES ($1, $2, $3, $4) RETURNING *', params);

        return res.rows[0];
    }

    static async updatePost(params) {
        const res = await pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3', params);

        return res.rows[0];
    }

    static async deletePost(params) {
        const res = await pool.query('DELETE FROM posts WHERE id = $1', params);

        return res.rows[0];
    }
}

module.exports = Post;