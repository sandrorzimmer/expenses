import express from "express";
import CategoryController from "../controllers/categoryController.js";
import paginate from "../middlewares/paginator.js";

const router = express.Router();

router
    .get("/categories", CategoryController.showCategories, paginate)
    .get("/categories/:id", CategoryController.showCategoryById)
    .post("/categories", CategoryController.addCategory)
    .put("/categories/:id", CategoryController.updateCategory)
    .delete("/categories/:id", CategoryController.deleteCategory)

export default router;