const Joi = require('joi');
const bcrypt = require('bcrypt');
const User = require('../models/user');


const getUsers = async (req, res) => {
    try {
        const users = await User.getUsers();

        if (!users) {
            return res.status(404).json({ message: 'Users not found' });
        }

        return res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const getUserById = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id <= 1) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const user = await User.getUserById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error retrieving user:', error);

        return res.status(500).json({ message: 'Internal server error' });
    }
}



const updateUser = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id <= 1) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

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

        let { name, email, password } = req.body;

        const existedUser = await User.findById(id);

        if (!existedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await User.updateUser([name, email, hashedPassword, id]);

        return res.status(200).json({ message: `User modified with ID: ${id}`, user: updatedUser });
    } catch (error) {
        console.error('Error during updating of user:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;

    if (isNaN(id) || id <= 1) {
        return res.status(400).json({ message: 'Invalid user ID' });
    }

    try {
        const existedUser = await User.findById(id);

        if (!existedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        const deletedUser = await User.deleteUser(id);

        return res.status(200).json({ message: `User deleted with ID: ${id}`, user: deletedUser });
    } catch (error) {
        console.error('Error during deletion of user:', error);
        return res.status(500).json({ message: 'Internal sever error' });
    }
}

module.exports = { getUsers, getUserById, updateUser, deleteUser };