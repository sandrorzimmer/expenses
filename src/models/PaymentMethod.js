import mongoose from "mongoose";

const paymentMethod = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, "Payment method name is required."],
            validate: {
                validator: function (name) {
                    return name.trim().length > 0
                },
                message: "Payment method name cannot be blank."
            }
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }
);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethod);

export default PaymentMethod;