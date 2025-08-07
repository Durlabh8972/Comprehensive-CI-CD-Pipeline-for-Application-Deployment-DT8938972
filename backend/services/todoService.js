// backend/services/todoService.js
// This service handles business logic for todos, interacting with the Todo model.
'use strict';
const Todo = require('../models/todoModel');

class TodoService {
  async getAllTodos() {
    return await Todo.findAll({ order: [['id', 'DESC']] });
  }

  async getTodoById(id) {
    const todo = await Todo.findByPk(id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    return todo;
  }

  async createTodo(todoData) {
    if (!todoData.title || todoData.title.trim() === '') {
      throw new Error('Title is required');
    }
    return await Todo.create({
      title: todoData.title.trim(),
      completed: todoData.completed || false,
    });
  }

  async updateTodo(id, updateData) {
    const todo = await this.getTodoById(id); // Throws if not found

    if (updateData.title !== undefined && updateData.title.trim() === '') {
      throw new Error('Title cannot be empty');
    }

    return await todo.update(updateData);
  }

  async deleteTodo(id) {
    const todo = await this.getTodoById(id); // Throws if not found
    await todo.destroy();
    return { message: 'Todo deleted successfully' };
  }

  async getTodoCount() {
    return await Todo.count();
  }
}

module.exports = new TodoService();
