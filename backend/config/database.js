// backend/config/database.js
'use strict';

import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
const envPath = process.env.NODE_ENV === 'test' ? '.env.test' : '../.env';
dotenv.config({ path: envPath });
let sequelize

if (process.env.NODE_ENV === 'test') {
  // Configuration for MySQL database (for tests)
  sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_NAME,
    logging: false,
  });
} else {
  // Configuration for PostgreSQL database (for development and production)
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      logging: false, // Disable logging for cleaner output
    }
  );
}

// A wrapper for database authentication
async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

// A wrapper for model synchronization
async function sync() {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Unable to synchronize models:', error);
    throw error;
  }
}

// Export the sequelize instance and the utility functions
export { sequelize, authenticate, sync };