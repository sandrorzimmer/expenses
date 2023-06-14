import NotFound from "../errors/NotFound.js";
import Category from "../models/Category.js";
import PaymentMethod from "../models/PaymentMethod.js";
import Expense from "../models/Expense.js";
import BadRequest from "../errors/BadRequest.js";

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

    static showExpensesByYear = async (req, res, next) => {
        try {
            const targetYear = parseInt(req.params.year);

            const [startDate, endDate] = getRangeDate(targetYear);

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
            const targetYear = parseInt(req.params.year);
            const targetMonth = parseInt(req.params.month);

            if (getRangeDate(targetYear, targetMonth) === false) {
                next(new BadRequest("Date is not valid"))
            } else {
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
            }
        } catch (error) {
            next(error);
        }
    }

    static showExpensesByYearMonthDay = async (req, res, next) => {
        try {
            const targetYear = parseInt(req.params.year);
            const targetMonth = parseInt(req.params.month);
            const targetDay = parseInt(req.params.day);

            if (getRangeDate(targetYear, targetMonth, targetDay) === false) {
                next(new BadRequest("Date is not valid"))
            } else {
                const [startDate, endDate] = getRangeDate(targetYear, targetMonth, targetDay);

                const searchExpenses = Expense
                    .find({
                        date: {
                            $gte: startDate,
                            $lte: endDate
                        }
                    });
                req.result = searchExpenses;

                next();
            }
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

//Returns an array with start date and end date, in ISO format.
//Accepts:
//(year, month, day) --> one day range
//(year, month) --> one month range
//(year) --> one year range
//Start date has time set to 00:00:00.000Z
//End date has time set to 23:59:59.999Z
//If provided data is an invalid date, returns false.
function getRangeDate(year, month, day) {
    let startDate;
    let endDate;

    try {

        //Only year is provided
        if (month === undefined && day === undefined) {
            startDate = (new Date(parseInt(year), 0, 1)).toISOString();
            endDate = (new Date(parseInt(year), 11, 31)).toISOString();

            //Year and month are provided
        } else if (day === undefined) {
            if (checkDateIsValid(`${year}-${month}-01`) === false) {
                return false;
            } else {
                startDate = (new Date(parseInt(year), parseInt(month) - 1, 1)).toISOString();
                endDate = (new Date(parseInt(year), parseInt(month), 0)).toISOString();
            }

            //Year, month and day are provided
        } else {
            if (checkDateIsValid(`${year}-${month}-${day}`) === false) {
                return false;
            } else {
                startDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toISOString();
                endDate = startDate;
            }
        }
    } catch (error) {
        return false;
    }

    const stringStartDate = startDate.slice(0, 11) + '00:00:00.000Z'; // Set time to 00:00:00.000Z
    const stringEndDate = endDate.slice(0, 11) + '23:59:59.999Z'; // Set time to 23:59:59.999Z

    const newStartDate = new Date(stringStartDate);
    const newEndDate = new Date(stringEndDate);

    return [newStartDate, newEndDate];
}

//Check if date is valid
//Input format: ("yyyy-mm-dd")
function checkDateIsValid(date) {
    const [year, month, day] = date.split('-');
    const parsedYear = parseInt(year);
    const parsedMonth = parseInt(month) - 1; // Adjust month to be zero-based
    const parsedDay = parseInt(day);

    const targetDate = new Date(parsedYear, parsedMonth, parsedDay);

    // Check if the parsed components match the original date and fall within the expected ranges
    if (
        parsedYear !== targetDate.getFullYear() ||
        parsedMonth !== targetDate.getMonth() ||
        parsedDay !== targetDate.getDate() ||
        parsedMonth < 0 || parsedMonth > 11 ||
        parsedDay < 1 || parsedDay > 31
    ) {
        return false;
    }

    return targetDate.toISOString();
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