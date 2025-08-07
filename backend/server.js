// backend/server.js
'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const todoRoutes = require('./routes/todoRoutes');
const sequelize = require('./config/database');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cors());
app.use(helmet());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Todo API is running...');
// Root endpoint
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync all models with the database. 
    // { force: true } will drop the table if it already exists. Use with caution.
    await sequelize.sync(); 
    console.log('All models were synchronized successfully.');

    return app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

let server;
if (require.main === module) {
  server = startServer(); // The global `server` variable is assigned the promise.
}

// Handle graceful shutdown on SIGINT and SIGTERM
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    server.then(s => {
      s.close(() => {
        console.log('HTTP server closed');
        process.exit(0);
      });
    }).catch(e => {
      console.error('Error during server shutdown:', e);
      process.exit(1);
    });
  }
});

module.exports = { app, startServer, sequelize }; // Export for testing
