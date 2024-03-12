const { Op } = require("sequelize");
const { User } = require("../db");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
  // handling request
  const { username, password, email } = req.body;

  if (!username || !email || !password) return res.status(400).json({ error: "Missing input fields" });

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (!user) return res.status(400).json({ error: "User not found" });
    else if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: "Incorrect password" });
    else {
      // setting the user status to active
      await User.update({ isActive: true }, { where: { username: username } });
      const updatedUser = await User.findOne({ where: { username: username } });
      console.log(updatedUser);
      return res.json(updatedUser);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = Login;
