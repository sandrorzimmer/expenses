import NotFound from "../errors/NotFound.js";
import PaymentMethod from "../models/PaymentMethod.js";

class PaymentMethodController {
    static showPaymentMethods = async (req, res, next) => {
        try {
            const searchPaymentMethods = PaymentMethod.find();

            req.result = searchPaymentMethods;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showPaymentMethodById = async (req, res, next) => {
        try {
            const paymentMethodId = req.params.id;
            const paymentMethodResult = await PaymentMethod.findById({ _id: paymentMethodId });

            if (paymentMethodResult) {
                res.status(200).json(paymentMethodResult);
            } else {
                next(new NotFound("Payment method ID not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static addPaymentMethod = async (req, res, next) => {
        try {
            const paymentMethod = new PaymentMethod(req.body);

            const paymentMethodResult = await paymentMethod.save();

            res.status(201).json(paymentMethodResult);
        } catch (error) {
            next(error);
        }
    }

    static updatePaymentMethod = async (req, res, next) => {
        try {
            const paymentMethodId = req.params.id;
            const updatedPaymentMethod = req.body;

            const paymentMethodResult = await PaymentMethod.findByIdAndUpdate({ _id: paymentMethodId }, updatedPaymentMethod, { new: true });

            if (paymentMethodResult) {
                res.status(200).json(paymentMethodResult);
            } else {
                next(new NotFound("Payment method ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }

    static deletePaymentMethod = async (req, res, next) => {
        try {
            const paymentMethodId = req.params.id;

            const paymentMethodResult = await PaymentMethod.findByIdAndDelete({ _id: paymentMethodId });

            if (paymentMethodResult !== null) {
                res.status(200).json({ message: `Payment method ID ${paymentMethodId} deleted successfully` });
            } else {
                next(new NotFound("Payment method ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default PaymentMethodController;