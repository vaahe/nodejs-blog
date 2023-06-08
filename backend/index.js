const app = require("./app");
const { PORT } = require('./config/');


const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}.`);
        });
    } catch (error) {
        console.error(error);
    }
}

start();