
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// REGISTER USER
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

// LOGIN USER
const loginUser = async (req, res) => {
  const { login, password, role } = req.body; // 👈 role now included

  console.log('🔍 Login attempt:', { login, role, password: password ? '***' : 'empty' });

  try {
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }],
    });

    console.log('👤 User found:', user ? { username: user.username, email: user.email, role: user.role } : 'No user found');

    if (!user) {
      console.log('❌ No user found with email/username:', login);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await user.matchPassword(password);
    console.log('🔐 Password match:', passwordMatch);

    if (!passwordMatch) {
      console.log('❌ Password mismatch for user:', user.username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (role !== user.role) {
      return res.status(403).json({ message: 'Role mismatch' });
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
