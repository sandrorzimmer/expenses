import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const expenseSchema = new mongoose.Schema(
    {
        id: { type: String },
        title: {
            type: String,
            required: [true, "Title is required"],
            validate: {
                validator: function (title) {
                    return title.trim().length > 0
                },
                message: "Title cannot be blank"
            }
        },
        description: { type: String },
        amount: {
            type: Number,
            required: [true, "Amount is required"],
            default: 0,
            get: formatAmount,
            set: convertAmount
        },
        date: {
            type: Date,
            default: () => {
                const currentDate = new Date();
                currentDate.setHours(0, 0, 0, 0); //set hours to 00:00:00.000
                return currentDate;
            },
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

//Enable model to use getter to convert cents to actual currency
expenseSchema.set("toJSON", { getters: true });

//Convert the amount in the database (in cents) to amount in actual currency
//(e.g, euros)
function formatAmount(amount) {
    return (amount / 100).toFixed(2);
};

//Convert the inserted amount in actual currency (e.g., euros) to amount in
//cents, to save in database
function convertAmount(amount) {
    return Math.round(parseFloat(amount) * 100);
};

//Customize error message for blank category and/or blank paymentMethod
//before sending the error to errorHandler.js
expenseSchema.pre("validate", function (next) {
    const error = this.validateSync();
    if (error && error.errors["category"] instanceof mongoose.CastError) {
        error.errors["category"].message = "Category cannot be blank";
    }

    if (error && error.errors["paymentMethod"] instanceof mongoose.CastError) {
        error.errors["paymentMethod"].message = "Payment method cannot be blank";
    }

    next(error);
});

expenseSchema.plugin(autopopulate);

const Expenses = mongoose.model("Expenses", expenseSchema);

export default Expenses;