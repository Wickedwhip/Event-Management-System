require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const User = require('../models/User');
const Event = require('../models/Event');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.error(err));

const seed = async () => {
  await User.deleteMany();
  await Event.deleteMany();

  const admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: 'admin123', role: 'admin' });
  const employee = await User.create({ name: 'Employee', email: 'employee@test.com', password: 'employee123', role: 'employee' });
  const user = await User.create({ name: 'User', email: 'user@test.com', password: 'user123', role: 'user' });

  await Event.create({ title: 'Launch Party', description: 'Product launch', date: new Date(), location: 'HQ', createdBy: admin._id });

  console.log('Seeding completed!');
  process.exit();
};

seed();
