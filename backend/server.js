'use strict';
import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import todoRoutes from './routes/todoRoutes.js';
import { sequelize, authenticate, sync } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(json());

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/todos', todoRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

async function startServer() {
  try {
    await authenticate();
    await sync();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
}

let server;

// Only start server if NOT running in test mode
if (process.env.NODE_ENV !== 'test') {
  server = startServer();
}

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  if (server) {
    Promise.resolve(server).then(s => {
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

// Export the app for testing without starting the server
export default app;
export { startServer, sequelize };
