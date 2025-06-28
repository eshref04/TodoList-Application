const pool = require('../config/database');

const getAllTodos = async (filters = {}) => {
  let query = 'SELECT * FROM todos';
  const values = [];
  const conditions = [];

  if (filters.completed !== undefined) {
    conditions.push('completed = $' + (values.length + 1));
    values.push(filters.completed);
  }
  if (filters.priority) {
    conditions.push('priority = $' + (values.length + 1));
    values.push(filters.priority);
  }
  if (conditions.length) {
    query += ' WHERE ' + conditions.join(' AND ');
  }
  query += ' ORDER BY created_at DESC';
  const { rows } = await pool.query(query, values);
  return rows;
};

const getTodoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM todos WHERE id = $1', [id]);
  return rows[0];
};

const createTodo = async (data) => {
  const { title, description, priority, due_date } = data;
  const { rows } = await pool.query(
    `INSERT INTO todos (title, description, priority, due_date) VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, description, priority || 'medium', due_date]
  );
  return rows[0];
};

const updateTodo = async (id, data) => {
  const { title, description, priority, due_date, completed } = data;
  const { rows } = await pool.query(
    `UPDATE todos SET title=$1, description=$2, priority=$3, due_date=$4, completed=$5, updated_at=NOW() WHERE id=$6 RETURNING *`,
    [title, description, priority, due_date, completed, id]
  );
  return rows[0];
};

const toggleTodo = async (id) => {
  const { rows } = await pool.query(
    `UPDATE todos SET completed = NOT completed, updated_at=NOW() WHERE id=$1 RETURNING *`,
    [id]
  );
  return rows[0];
};

const deleteTodo = async (id) => {
  await pool.query('DELETE FROM todos WHERE id = $1', [id]);
};

const getStats = async () => {
  const total = await pool.query('SELECT COUNT(*) FROM todos');
  const completed = await pool.query('SELECT COUNT(*) FROM todos WHERE completed = true');
  const pending = await pool.query('SELECT COUNT(*) FROM todos WHERE completed = false');
  return {
    total: Number(total.rows[0].count),
    completed: Number(completed.rows[0].count),
    pending: Number(pending.rows[0].count),
  };
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
  getStats,
}; 