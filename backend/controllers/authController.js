const pool = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const Auth = require('../models/auth');

const signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const usernameExists = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (usernameExists.rowCount > 0) {
            res.status(409).send('Username already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await pool.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).send('User registered successfully!');
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).send('An error occurred during signup');
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];
        console.log(user.id)

        if (!user) {
            res.status(401).send('Invalid credentials');
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            console.log(token);
            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
            // res.send('Login successful!');
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).send('An error occurred during login');
    }
}

module.exports = { signUp, signIn };