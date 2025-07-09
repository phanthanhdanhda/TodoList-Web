const express = require('express');
const router = express.Router();
const {
  getTodos, createTodo, toggleTodo, deleteTodo,
  exportTodos, importTodos
} = require('../controllers/todoController');
const fileUpload = require('express-fileupload');

router.use(fileUpload());

router.get('/', getTodos);
router.post('/', createTodo);
router.patch('/:id', toggleTodo);
router.delete('/:id', deleteTodo);

router.get('/export', exportTodos);
router.post('/import', importTodos);

module.exports = router;
