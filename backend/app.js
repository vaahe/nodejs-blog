const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { verifyToken } = require('./middlewares/auth');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use("/posts", postRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

module.exports = app;