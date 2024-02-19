const { User } = require("../db");

const createUser = async (req, res) => {
  try {
    const { username, email, password, name, profilePicture } = req.body;
    if (!email || !password || !username) return res.status(400).send("Empty inputs");

    const existingUser = await User.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) return res.status(400).send("user already registered");

    const newUser = await User.create({
      name,
      email,
      password,
      username,
      profilePicture,
      isActive: false,
    });

    return res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = createUser;
