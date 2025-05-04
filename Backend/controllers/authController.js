const User = require("../models/User");
exports.register = async (req, res) => {
  const { name, phoneNumber } = req.body;
  try {
    let user = await User.findOne({ phoneNumber });
    if (user) return res.status(400).json({ msg: "User already exists" });
    user = new User({ name, phoneNumber });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
    const { phoneNumber } = req.body;
    try {
      const user = await User.findOne({ phoneNumber });
      if (!user) return res.status(400).json({ msg: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).send("Server error");
    }
  };