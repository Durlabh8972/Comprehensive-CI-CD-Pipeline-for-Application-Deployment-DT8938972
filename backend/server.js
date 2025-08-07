'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const todoRoutes = require('./routes/todoRoutes');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

// Database synchronization and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models with the database. 
    // { force: true } will drop the table if it already exists. Use with caution.
    await sequelize.sync(); 
    console.log('All models were synchronized successfully.');

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

let server;
if (require.main === module) {
  server = startServer();
}

module.exports = { app, startServer, sequelize }; // Export for testing
