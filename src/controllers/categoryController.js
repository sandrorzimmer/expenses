import BaseError from "../errors/BaseError.js";
import NotFound from "../errors/NotFound.js";
import Category from "../models/Category.js";

class CategoryController {
    static showCategories = async (req, res, next) => {
        try {
            const searchCategories = Category.find();

            req.result = searchCategories;

            next();
        } catch (error) {
            next(error);
        }
    }

    static showCategoryById = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const categoryResult = await Category.findById({ _id: categoryId });

            if (categoryResult) {
                res.status(200).json(categoryResult);
            } else {
                next(new NotFound("Category ID not found"));
            }

        } catch (error) {
            next(error);
        }
    }

    static addCategory = async (req, res, next) => {
        try {
            const category = new Category(req.body);

            const categoryResult = await category.save();

            res.status(201).json(categoryResult);
        } catch (error) {
            next(error);
        }
    }

    static updateCategory = async (req, res, next) => {
        try {
            const categoryId = req.params.id;
            const updatedCategory = req.body;

            const categoryResult = await Category.findByIdAndUpdate({ _id: categoryId }, updatedCategory, { new: true });

            if (categoryResult) {
                res.status(200).json(categoryResult);
            } else {
                next(new NotFound("Category ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }

    static deleteCategory = async (req, res, next) => {
        try {
            const categoryId = req.params.id;

            const categoryResult = await Category.findByIdAndDelete({ _id: categoryId });

            if (categoryResult !== null) {
                res.status(200).json({ message: `Category ID ${categoryId} deleted successfully` });
            } else {
                next(new NotFound("Category ID not found"));
            }
        } catch (error) {
            next(error);
        }
    }
}

export default CategoryController;