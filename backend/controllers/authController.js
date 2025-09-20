const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });

  const user = await User.create({ name, email, password, role });
  res.status(201).json({ 
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token: generateToken(user._id)
  });
};
