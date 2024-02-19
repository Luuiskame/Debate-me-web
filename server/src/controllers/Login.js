const { Op } = require("sequelize");
const { User } = require("../db");

const Login = async (req, res) => {
  // handling request
  const { username, password, email } = req.body;
  if ((!username || email) && !password) return res.status(400).send(400, ` username/email and password are require fields`);

  try {
    const user = await User.findOne({
      where: {
        [Op.and]: [
          {
            [Op.or]: [{ username: username }, { email: email }],
          },
          { password: password },
        ],
      },
    });

    if (!user) return res.send(400, "Password or Username Invalid");
    else {
      // setting the user status to active :)
      await User.update({ isActive: true }, { where: { username: username } });

      // sending the updated user values
      const updatedUser = await User.findOne({ where: { username: username } });
      return res.json(updatedUser);
    }
  } catch (err) {
    res.send(500, `A server error occurred :c`).json(err);
  }
};

module.exports = Login;
