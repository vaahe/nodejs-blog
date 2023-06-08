const pool = require('../config/database');


class Auth {
    static async signUp(params) {
        const res = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', params);

        return res.rows[0];
    }

    static async signIn(params) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [params]);

        return res.rows[0];
    }

    static async findByEmail(params) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [params]);

        return res.rows[0];
    }
}

module.exports = Auth;