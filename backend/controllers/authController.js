const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');


const signUp = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, password } = req.body;

        const existedUser = await Auth.findByEmail(email);

        if (existedUser) {
            return res.status(409).json({ message: 'User with the same email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Auth.signUp([name, email, hashedPassword]);

        return res.status(201).json({ message: 'User registered successfully', user: user });
    } catch (error) {
        console.error('Error during creation of user:', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
}

const signIn = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    try {
        const { error } = schema.validate(req.body);

        if (error) {
            return req.status(404).json({ message: error.details[0].message });
        }

        const { email, password } = req.body;

        const user = await Auth.signIn(email);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h',
            });

            res.json({
                token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email
                }
            });
        } else {
            res.status(401).send('Authentication failed');
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { signUp, signIn };