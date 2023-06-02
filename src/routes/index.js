import express from "express";
import categories from "./categoriesRoutes.js"

const routes = (app) => {
    app.route("/").get((req, res) => {
        res.status(200).send({
            title: "Expenses"
        });
    });

    app.use(
        // express.json(),
        categories
    )
}

export default routes;