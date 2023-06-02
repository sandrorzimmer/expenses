import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        id: { type: String },
        expense: {
            type: String,
            required: [true, "Expense is required."],
            validate: {
                validator: function (expense) {
                    return expense.trim().length > 0
                },
                message: "Expense cannot be blank."
            }
        },
        description: { type: String },
        amount: {
            type: Number,
            required: [true, "Amount is required."],
            default: 0,
            get: formatAmount,
            set: convertAmount
        },
        date: {
            type: Date,
            required: true,
            default: new Date()
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: [true, "Category is required"],
            autopopulate: { select: "name" }
        },
        paymentMethod: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PaymentMethod",
            required: [true, "Payment method is required"],
            autopopulate: { select: "name" }
        }
    }
);

function formatAmount(amount) {
    return (amount / 100).toFixed(2);
};

function convertAmount(amount) {
    return Math.round(parseFloat(amount) * 100);
}

expenseSchema.plugin(autopopulate);

const Expenses = mongoose.model("Expenses", expenseSchema);

export default Expenses;