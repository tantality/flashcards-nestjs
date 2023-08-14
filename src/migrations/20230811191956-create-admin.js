/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require('bcrypt');
const normalizeEmail = require('normalize-email');
const { config } = require('dotenv');
config();

const ADMIN = {
  name: 'admin',
  email: process.env.ADMIN_EMAIL,
  normalizedEmail: normalizeEmail(process.env.ADMIN_EMAIL),
  role: 'admin',
};

const SALT_ROUNDS = 10;

module.exports = {
  async up(db, client) {
    const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, SALT_ROUNDS);
    await db.collection('users').insertOne({ ...ADMIN, password });
  },

  async down(db, client) {
    await db.collection('users').deleteOne({ normalizedEmail: ADMIN.normalizedEmail });
  },
};

