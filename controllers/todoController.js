const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    res.json(todos);
  };
  
  exports.createTodo = async (req, res) => {
    const { title } = req.body;
    const todo = await Todo.create({ title, user: req.user._id });
    res.status(201).json(todo);
  };
  
  exports.toggleTodo = async (req, res) => {
    const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ error: 'Not found' });
    todo.completed = !todo.completed;
    await todo.save();
    res.json(todo);
  };
  
  exports.deleteTodo = async (req, res) => {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!todo) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  };
  
  exports.exportTodos = async (req, res) => {
    const todos = await Todo.find({ user: req.user._id });
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="todos.json"');
    res.send(JSON.stringify(todos, null, 2));
  };
  
  exports.importTodos = async (req, res) => {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    const json = JSON.parse(req.files.file.data.toString('utf-8'));
    const imported = await Todo.insertMany(
      json.map(t => ({ title: t.title, completed: !!t.completed, user: req.user._id }))
    );
    res.json({ message: `Imported ${imported.length} tasks` });
  };
  