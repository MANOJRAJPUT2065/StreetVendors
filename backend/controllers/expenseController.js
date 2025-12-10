const Expense = require('../models/Expense');

// POST /api/expenses
const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      owner: req.user._id
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ owner: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({ _id: req.params.id, owner: req.user._id });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
};
