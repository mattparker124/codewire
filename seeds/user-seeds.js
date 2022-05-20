const { User } = require('../models');

const userData = [
  {
    username: 'Admin',
    password: 'password',
    email: 'defaultemail@gmail.com'
  },
  {
    username: 'Username69',
    password: 'password',
    email: 'defaultemail1@gmail.com'
  },
  {
    username: 'Jerry',
    password: 'password',
    email: 'defaultemail2@gmail.com'
  },
  {
    username: 'JohnnyBoi222',
    password: 'password',
    email: 'defaultemail3@gmail.com'
  },
  {
    username: 'xX-h34dshot-supr3m3-360-Xx',
    password: 'password',
    email: 'defaultemail4@gmail.com'
  }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
