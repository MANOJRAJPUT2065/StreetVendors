const express = require('express');
const { protect } = require('../middleware/auth');
const {
  createExpense,
  getExpenses,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getExpenses)
  .post(createExpense);

router.route('/:id')
  .put(updateExpense)
  .delete(deleteExpense);

module.exports = router;
