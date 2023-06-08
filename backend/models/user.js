const pool = require('../config/database');


class User {
    static async getUsers(params) {
        const res = await pool.query('SELECT * FROM users ORDER BY id ASC', params);

        return res.rows;
    }

    static async getUserById(params) {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [params]);

        return res.rows[0];
    }

    static async findById(params) {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [params]);

        return res.rows[0];
    }

    static async createUser(params) {
        const res = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', params);

        return res.rows[0];
    }


    static async updateUser(params) {
        const res = await pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', params);

        return res.rows[0];
    }

    static async deleteUser(params) {
        const res = await pool.query('DELETE FROM users WHERE id = $1', [params]);

        return res.rows[0];
    }
}

module.exports = User;