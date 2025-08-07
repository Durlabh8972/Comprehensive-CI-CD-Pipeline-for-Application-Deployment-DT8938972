// backend/config/database.js
'use strict';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' }); 
} else {
  require('dotenv').config({ path: '../.env' }); 
}

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  storage: process.env.DB_NAME, 
  logging: false,
});

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