// backend/config/database.js
'use strict';
const { Sequelize } = require('sequelize');

// Load environment variables from .env file
if (process.env.NODE_ENV === 'test') {
  // Loads from backend/.env.test
  require('dotenv').config({ path: '.env.test' }); 
} else {
  // Loads from root .env
  require('dotenv').config({ path: '../.env' }); 
}

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // Configuration for the test environment (SQLite in-memory)
  sequelize = new Sequelize({
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_NAME, // For SQLite, DB_NAME is the storage path
    logging: false,
  });
} else {
  // Configuration for development/production (PostgreSQL)
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
  });
}

module.exports = sequelize;