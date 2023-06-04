import NotFound from "../errors/NotFound.js";
import Category from "../models/Category.js";
import PaymentMethod from "../models/PaymentMethod.js";
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

    static showExpensesCurrentMonth = async (req, res, next) => {
        try {
            const [currentYear, currentMonth] = getCurrentYearMonth();

            const [startDate, endDate] = getRangeDate(currentYear, currentMonth);

            const searchExpenses = Expense
                .find({
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                });

            req.result = searchExpenses;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showExpensesLastMonth = async (req, res, next) => {
        try {
            const [currentYear, currentMonth] = getCurrentYearMonth();

            const [startDate, endDate] = getRangeDate(currentYear, currentMonth - 1);

            const searchExpenses = Expense
                .find({
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                });

            req.result = searchExpenses;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showExpensesByYearMonth = async (req, res, next) => {
        try {
            const targetYear = req.params.year;
            const targetMonth = req.params.month;

            const [startDate, endDate] = getRangeDate(targetYear, targetMonth);

            const searchExpenses = Expense
                .find({
                    date: {
                        $gte: startDate,
                        $lte: endDate
                    }
                });

            req.result = searchExpenses;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showExpensesByFilter = async (req, res, next) => {
        try {
            const search = await searchHandling(req.query);

            if (search !== null) {
                const expenseResult = Expense
                    .find(search);

                req.result = expenseResult;

                next();
            } else {
                res.status(200).json([]);
            }
        } catch (error) {
            next(error);
        }
    }
}

//Return month and year to search
function getRangeDate(year, month) {
    const startDate = new Date(year, month - 1, 1); //first day of the month
    const endDate = new Date(year, month, 0); //last day of the month

    return [startDate, endDate];
}

//Return array with current year and current month (1 - 12)
function getCurrentYearMonth() {
    //Get current date
    const currentDate = new Date();

    //Extract year and month from current date
    const currentMonth = currentDate.getMonth() + 1; //months are zero based (0-11)
    const currentYear = currentDate.getFullYear();

    return [currentYear, currentMonth];
}

async function searchHandling(params) {
    const { title, description, minDate, maxDate, category, paymentMethod } = params;

    let search = {};

    if (title) search.title = { $regex: title, $options: "i" };

    if (description) search.description = { $regex: description, $options: "i" };

    if (minDate || maxDate) search.date = {};
    if (minDate) search.date.$gte = new Date(minDate);
    if (maxDate) search.date.$lte = new Date(maxDate);

    if (category) {
        const nameCategory = await Category.findOne({ name: { $regex: category, $options: "i" } });

        if (nameCategory !== null) {
            search.category = nameCategory._id;
        } else {
            search = null;
        }
    }

    if (paymentMethod) {
        const namePaymentMethod = await PaymentMethod.findOne({ name: { $regex: paymentMethod, $options: "i" } });

        if (namePaymentMethod !== null) {
            search.paymentMethod = namePaymentMethod._id;
        } else {
            search = null;
        }
    }

    //If no valid search is provided, return search = null
    if (search && typeof search === "object" && Object.keys(search).length === 0) {
        search = null;
    }

    return search;

}

export default ExpenseController;