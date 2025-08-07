'use strict';
import request from 'supertest';
import  app, {startServer } from '../server'; // Import startServer
import { sequelize } from '../config/database';
import Todo from '../models/todoModel';
import todoService from '../services/todoService';

let server;

// Uses an in-memory SQLite database for tests
beforeAll(async () => {
  // Start the server and assign the returned instance
  server = await startServer(); 
  await sequelize.sync({ force: true });
});

// Clear the table before each test
beforeEach(async () => {
  await Todo.destroy({ where: {}, truncate: true });
});

// Close the database connection AND the server after all tests
afterAll(async () => {
  await new Promise(resolve => server.close(resolve));
  await sequelize.close();
});

describe('Todo API', () => {
  
  describe('POST /api/todos', () => {
    it('should create a new todo and return it', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo' });
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Test Todo');
      expect(res.body.completed).toBe(false);
    });

    it('should return 400 if title is missing', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ completed: false });
      
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Title is required');
    });
  });

  describe('GET /api/todos', () => {
    it('should return an array of todos', async () => {
      await Todo.create({ title: 'Todo 1' });
      await Todo.create({ title: 'Todo 2' });

      const res = await request(app).get('/api/todos');
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.length).toBe(2);
      expect(res.body[0].title).toBe('Todo 2'); // Ordered by ID DESC
    });
  });

  describe('GET /api/todos/:id', () => {
    it('should return a single todo if found', async () => {
      const todo = await Todo.create({ title: 'Find Me' });
      
      const res = await request(app).get(`/api/todos/${todo.id}`);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Find Me');
    });

    it('should return 404 if todo is not found', async () => {
      const res = await request(app).get('/api/todos/999');
      
      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('error', 'Todo not found');
    });
    
    it('should return 500 if the service throws an error', async () => {
      const mock = jest.spyOn(todoService, 'getTodoById').mockRejectedValue(new Error('Something went wrong'));

      const res = await request(app).get('/api/todos/1');

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'Internal server error');

      mock.mockRestore();
    });

    it('should return 400 for an invalid ID', async () => {
      const res = await request(app).get('/api/todos/abc');
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'Invalid todo ID');
    });
  });

  describe('PUT /api/todos/:id', () => {
    it('should update a todo and return it', async () => {
      const todo = await Todo.create({ title: 'Update Me' });
      
      const res = await request(app)
        .put(`/api/todos/${todo.id}`)
        .send({ title: 'Updated Title', completed: true });
        
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Updated Title');
      expect(res.body.completed).toBe(true);
    });

    it('should return 404 if todo to update is not found', async () => {
      const res = await request(app)
        .put('/api/todos/999')
        .send({ title: 'Wont work' });
        
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should delete a todo and return 204', async () => {
      const todo = await Todo.create({ title: 'Delete Me' });
      
      const res = await request(app).delete(`/api/todos/${todo.id}`);
      
      expect(res.statusCode).toEqual(204);

      const found = await Todo.findByPk(todo.id);
      expect(found).toBeNull();
    });

    it('should return 404 if todo to delete is not found', async () => {
      const res = await request(app).delete('/api/todos/999');
      
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('GET /api/todos/stats/count', () => {
    it('should return the total count of todos', async () => {
        await Todo.bulkCreate([
          { title: 'Count 1' },
          { title: 'Count 2' },
          { title: 'Count 3' },
        ]);

        const res = await request(app).get('/api/todos/stats/count');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('count', 3);
    });
  });
});