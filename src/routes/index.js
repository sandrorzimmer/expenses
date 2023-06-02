import categories from "./categoriesRoutes.js"
import paymentMethods from "./paymentMethodsRoutes.js"
import expenses from "./expensesRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({
            title: "Expenses"
        });
    });

    app.use(
        categories,
        paymentMethods,
        expenses
    )
}

export default routes;