const { Op } = require("sequelize");
const { User } = require("../db");

const isExisting = async (req, res) => {
  console.log(req.body);
  const { email, username } = req.body;
  if (!email || !username) return res.status(400).send(400, `Email/username is a required field `);
  try {
    const userExist = await User.findOne({ where: { [Op.or]: [{ username: username }, { email: email }] } });

    return userExist ? res.send(true) : res.send(false);
  } catch (error) {
    return res.send(500);
  }
};

module.exports = isExisting;
