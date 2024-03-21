const { User } = require('../db');

const getUserByUsername = async (req, res) => {
    try {
        const { username } = req.query;

        if (!username) {
            return res.status(400).send("Username is required");
        }

        const usernameToLowerCase = username.toLowerCase();

        const user = await User.findOne({ where: { username: usernameToLowerCase } });

        if (!user) {
            return res.status(404).send("User not found");
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getUserByUsername;
