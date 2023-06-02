import express from "express";
import ExpenseController from "../controllers/expenseController.js";
import paginate from "../middlewares/paginator.js";

const router = express.Router();

router
    .get("/expenses", ExpenseController.showExpenses, paginate)
    .get("/expenses/:id", ExpenseController.showExpenseById)
    .post("/expenses", ExpenseController.addExpense)
    .put("/expenses/:id", ExpenseController.updateExpense)
    .delete("/expenses/:id", ExpenseController.deleteExpense)

export default router;