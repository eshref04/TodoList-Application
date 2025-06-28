const Todo = require('../models/Todo');
const Joi = require('joi');
const { todoSchema } = require('../utils/validation');

exports.getAllTodos = async (req, res, next) => {
  try {
    const { completed, priority } = req.query;
    const filters = {};
    if (completed !== undefined) filters.completed = completed === 'true';
    if (priority) filters.priority = priority;
    const todos = await Todo.getAllTodos(filters);
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

exports.getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.getTodoById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo bulunamadı' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

exports.createTodo = async (req, res, next) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const todo = await Todo.createTodo(req.body);
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    const { error } = todoSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
    const todo = await Todo.updateTodo(req.params.id, req.body);
    if (!todo) return res.status(404).json({ message: 'Todo bulunamadı' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

exports.toggleTodo = async (req, res, next) => {
  try {
    const todo = await Todo.toggleTodo(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo bulunamadı' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    await Todo.deleteTodo(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const stats = await Todo.getStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}; 