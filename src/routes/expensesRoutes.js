import express from "express";
import ExpenseController from "../controllers/expenseController.js";
import paginate from "../middlewares/paginator.js";

const router = express.Router();

router
    .get("/expenses", ExpenseController.showExpenses, paginate)
    .get("/expenses/search", ExpenseController.showExpensesByFilter, paginate)
    .get("/expenses/search/:year", ExpenseController.showExpensesByYear, paginate)
    .get("/expenses/search/:year/:month", ExpenseController.showExpensesByYearMonth, paginate)
    .get("/expenses/search/:year/:month/:day", ExpenseController.showExpensesByYearMonthDay, paginate)
    .get("/expenses/currentMonth", ExpenseController.showExpensesCurrentMonth, paginate)
    .get("/expenses/lastMonth", ExpenseController.showExpensesLastMonth, paginate)
    .get("/expenses/:id", ExpenseController.showExpenseById)
    .post("/expenses", ExpenseController.addExpense)
    .put("/expenses/:id", ExpenseController.updateExpense)
    .delete("/expenses/:id", ExpenseController.deleteExpense)

export default router;