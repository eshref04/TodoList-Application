const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo yönetimi
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Tüm todoları getir
 *     tags: [Todos]
 *     parameters:
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *         description: Tamamlanma durumuna göre filtrele
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *         description: Önceliğe göre filtrele
 *     responses:
 *       200:
 *         description: Todo listesi
 *   post:
 *     summary: Yeni todo oluştur
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Oluşturulan todo
 */

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: ID ile todo getir
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Todo bulundu
 *       404:
 *         description: Todo bulunamadı
 *   put:
 *     summary: Todo güncelle
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Güncellenen todo
 *       404:
 *         description: Todo bulunamadı
 *   delete:
 *     summary: Todo sil
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Silindi
 *       404:
 *         description: Todo bulunamadı
 */

/**
 * @swagger
 * /todos/{id}/toggle:
 *   patch:
 *     summary: Tamamlanma durumunu değiştir
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Güncellenen todo
 *       404:
 *         description: Todo bulunamadı
 */

/**
 * @swagger
 * /todos/stats:
 *   get:
 *     summary: Todo istatistiklerini getir
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: İstatistikler
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         completed:
 *           type: boolean
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *         due_date:
 *           type: string
 *           format: date
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

router.get('/stats', todoController.getStats);
router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', todoController.createTodo);
router.put('/:id', todoController.updateTodo);
router.patch('/:id/toggle', todoController.toggleTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router; 