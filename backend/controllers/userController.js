const pool = require('../config/database');
const bcrypt = require('bcrypt');
const User = require('../models/user')

const getUsers = async (req, res) => {
    const users = await User.getUsers();
    return res.status(200).json(users);
}

const getUserById = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await User.getUserById([id]);

    return res.json(user);
    // pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error;
    //     }

    //     res.status(200).json(results.rows);
    // });
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.createUser([name, email, password]);

    // pool.query('INSERT INTO users (name, email, password) VALUES ($name, $email, $password senc? obshi chem pordzel pordzi miqich het) RETURNING *', [name, email, password], (error, results) => {
    //     if (error) {
    //         throw error;
    //     }

    //     res.status(201).send(`User added with ID: ${results.rows[0].id}`); // senc
    // });

    res.status(201).send(`User added with ID: ${user.id}`); // senc
    return res.json(user);
}

const updateUser = async (req, res) => {
    const id = parseInt(req.params.id);
    let { name, email, password } = req.body;

    const isUserExists = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

    if (!isUserExists.rowCount) {
        return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedUser = await User.updateUser([name, email, hashedPassword, id]);

    res.status(200).send(`User modified with ID: ${id}`);
    return res.json(updatedUser);

    // pool.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, hashedPassword, id], (error, results) => {
    //     if (error) {
    //         throw error;
    //     }

    //     response.status(200).send(`User modified with ID: ${id}`);
    // });
}

const deleteUser = (req, res) => {
    const id = parseInt(req.params.id);

    const deletedUser = User.deleteUser([id]);

    res.status(200).send(`User deleted with ID: ${id}`);
    res.json(deletedUser);

    // pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    //     if (error) {
    //         throw error;
    //     }

    //     response.status(200).send(`User deleted with ID: ${id}`);
    // });
}

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };