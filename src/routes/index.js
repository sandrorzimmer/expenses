import categories from "./categoriesRoutes.js"
import paymentMethods from "./paymentMethodsRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({
            title: "Expenses"
        });
    });

    app.use(
        categories,
        paymentMethods
    )
}

export default routes;