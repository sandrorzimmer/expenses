import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const expenseSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: {
            type: String,
            required: [true, "Expense is required."],
            validate: {
                validator: function (title) {
                    return title.trim().length > 0
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

//Convert the amount in the database (in cents) to amount in actual currency
//(e.g, euros)
function formatAmount(amount) {
    return (amount / 100).toFixed(2);
};

//Convert the inserted amount in actual currency (e.g., euros) to amount in
//cents, to save in database
function convertAmount(amount) {
    return Math.round(parseFloat(amount) * 100);
}

expenseSchema.plugin(autopopulate);

const Expenses = mongoose.model("Expenses", expenseSchema);

export default Expenses;