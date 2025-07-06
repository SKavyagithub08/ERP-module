const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  const { name, username, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({
      name,
      username,
      email,
      password,
      role,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      token: generateToken(user),
      transportOptions: ['Domestic Transport', 'Local Transport'],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const loginUser = async (req, res) => {
  const { login, password } = req.body; 

  try {
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
      token: generateToken(user),
      transportOptions: ['Domestic Transport', 'Local Transport'],
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser };
