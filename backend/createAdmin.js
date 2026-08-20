// Run this once from the backend folder to create your admin account:
//   node createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const ADMIN_NAME = 'Admin';
const ADMIN_EMAIL = 'admin@shop.com';
const ADMIN_PASSWORD = 'admin123'; // change this after first login

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log('Admin already exists:', ADMIN_EMAIL);
    process.exit(0);
  }

  await User.create({
    name: ADMIN_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: 'admin'
  });

  console.log('Admin account created!');
  console.log('Email:', ADMIN_EMAIL);
  console.log('Password:', ADMIN_PASSWORD);
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
