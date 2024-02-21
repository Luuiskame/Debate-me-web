const { User } = require("../db");

const isExisting = async (req, res) => {
  const { email, username } = req.body.data;
  if (!email && !username) return res.status(400).send(400`Email/username is a required field `);
  try {
  } catch (error) {}
};

module.exports = isExisting;
