const { Op } = require("sequelize");
const { User } = require("../db");

const Login = async (req, res) => {
  // handling request
  console.log(req);
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
    // setting the user status to active :)

    await User.update({ isActive: true }, { where: { username: username } });
    const updatedUser = await User.findOne({ where: { username: username } });

    // sending the updated user values

    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.send(404, "Password or Username Invalid");
  }
};

module.exports = Login;
