'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'User 1',
          email: 'user1@hotmail.com',
          password: bcrypt.hashSync('passwordUser1', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'User 2',
          email: 'user2@hotmail.com',
          password: bcrypt.hashSync('passwordUser2', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'User 3',
          email: 'user3@hotmail.com',
          password: bcrypt.hashSync('passwordUser3', 12),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
