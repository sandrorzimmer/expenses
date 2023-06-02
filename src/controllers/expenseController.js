import NotFound from "../errors/NotFound.js";
import Expense from "../models/Expense.js";

class ExpenseController {
    static showExpenses = async (req, res, next) => {
        try {
            const searchExpenses = Expense.find();

            req.result = searchExpenses;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showExpenseById = async (req, res, next) => {
        try {
            const expenseId = req.params.id;
            const expenseResult = await Expense.findById({ _id: expenseId });

            if (expenseResult) {
                res.status(200).json(expenseResult);
            } else {
                next(new NotFound("Expense ID not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static addExpense = async (req, res, next) => {
        try {
            const expense = new Expense(req.body);

            const expenseResult = await expense.save();

            res.status(201).json(expenseResult);
        } catch (error) {
            next(error);
        }
    }

    static updateExpense = async (req, res, next) => {
        try {
            const expenseId = req.params.id;
            const updatedExpense = req.body;

            const expenseResult = await Expense.findByIdAndUpdate({ _id: expenseId }, updatedExpense, { new: true });

            if (expenseResult) {
                res.status(200).json(expenseResult);
            } else {
                next(new NotFound("Expense ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }

    static deleteExpense = async (req, res, next) => {
        try {
            const expenseId = req.params.id;

            const expenseResult = await Expense.findByIdAndDelete({ _id: expenseId });

            if (expenseResult !== null) {
                res.status(200).json({ message: `Expense ID ${expenseId} deleted successfully` });
            } else {
                next(new NotFound("Expense ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default ExpenseController;