// backend/routes/todoRoutes.js
'use strict';
import { Router } from 'express';
import todoController, { getAllTodos, getTodoById, createTodo, updateTodo, deleteTodo, getTodoCount } from '../controllers/todoController';
const router = Router();

// Get all todos
// Get all todos
router.get('/', (req, res) => todoController.getAllTodos(req, res));

// Get todo by id
router.get('/:id', (req, res) => todoController.getTodoById(req, res));
// Create new todo
// router.post('/', createTodo.bind(todoController));
router.post('/', (req, res) => todoController.createTodo(req, res));

// Update todo
// router.put('/:id', updateTodo.bind(todoController));
router.put('/:id', (req, res) => todoController.updateTodo(req, res));

// Delete todo
// router.delete('/:id', deleteTodo.bind(todoController));
router.delete('/:id', (req, res) => todoController.deleteTodo(req, res));

// Get todo count
// router.get('/stats/count', getTodoCount.bind(todoController));
router.get('/stats/count', (req, res) => todoController.getTodoCount(req, res));

export default router;