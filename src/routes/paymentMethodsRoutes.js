import express from "express";
import PaymentMethodController from "../controllers/paymentMethodController.js";
import paginate from "../middlewares/paginator.js";

const router = express.Router();

router
    .get("/paymentMethods", PaymentMethodController.showPaymentMethods, paginate)
    .get("/paymentMethods/:id", PaymentMethodController.showPaymentMethodById)
    .post("/paymentMethods", PaymentMethodController.addPaymentMethod)
    .put("/paymentMethods/:id", PaymentMethodController.updatePaymentMethod)
    .delete("/paymentMethods/:id", PaymentMethodController.deletePaymentMethod)

export default router;