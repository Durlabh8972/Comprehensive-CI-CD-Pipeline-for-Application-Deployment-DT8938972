// backend/models/todoModel.js
// This is the Sequelize model for the 'todos' table.
'use strict';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Todo = sequelize.define('Todo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: 'todos',
  timestamps: true, // Sequelize will manage createdAt and updatedAt
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Todo;