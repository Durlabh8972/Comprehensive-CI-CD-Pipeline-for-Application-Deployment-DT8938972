// server.js
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

//  Health check for Express backend routes
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

    return app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start the server:', error);
    process.exit(1);
  }
}

let server;
// if (require.main === module) {
  server = startServer(); 
// }

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

// export default { app, startServer, sequelize }; 
// Export the Express app as the default export
export default app; 

// Export other components as named exports
export { startServer, sequelize };