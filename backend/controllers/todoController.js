
// backend/controllers/todoController.js
'use strict';
import todoService from '../services/todoService';
import todoService from '../services/todoService';

class TodoController {
  async getAllTodos(req, res) {
    try {
      const todos = await todoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTodoById(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid todo ID' });
      }
      const todo = await todoService.getTodoById(id);
      res.json(todo);
    } catch (error) {
      if (error.message === 'Todo not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }


  async createTodo(req, res) {
    try {
      const { title, completed } = req.body;
      const newTodo = await todoService.createTodo({ title, completed });
      res.status(201).json(newTodo);
    } catch (error) {
      if (error.message === 'Title is required') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateTodo(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid todo ID' });
      }


      const { title, completed } = req.body;
      const updatedTodo = await todoService.updateTodo(id, { title, completed });

      res.json(updatedTodo);

    } catch (error) {
      if (error.message === 'Todo not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Title cannot be empty') {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteTodo(req, res) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid todo ID' });
      }
      await todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      if (error.message === 'Todo not found') {
        return res.status(404).json({ error: error.message });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getTodoCount(req, res) {
    try {
      const count = await todoService.getTodoCount();
      res.json({ count });
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
      console.log("An error occurred:", error);
    }
  }
}

export default new TodoController();



