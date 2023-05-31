const pool = require('../config/database');

class Auth {
    static async signin(params) {
        const res = await pool.query( 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', params);

        return res.rows[0];
    }

    static async signup(params) {
        const res = await pool.query('DELETE FROM users WHERE id = $1', params);

        return res.rows[0];
    }
}

module.exports = Auth;