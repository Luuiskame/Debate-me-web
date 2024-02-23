const { Op } = require("sequelize");
const { User } = require("../db");

const Login = async (req, res) => {
  // handling request
  console.log(req.body);
  const { username, password, email } = req.body;

  if (!username || !email || !password) return res.status(400).send(400, ` username/email and password are require fields`);

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
    // setting the user status to active :)
    if (!user) return res.status(400).send(400);
    else if (user) {
      await User.update({ isActive: true }, { where: { username: username } });
      const updatedUser = await User.findOne({ where: { username: username } });
      return res.json(updatedUser);
    }
    console.log(updatedUser);
    // sending the updated user values
  } catch (err) {
    console.log(err);
  }
};

module.exports = Login;
