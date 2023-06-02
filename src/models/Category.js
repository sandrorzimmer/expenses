import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        id: { type: String },
        name: {
            type: String,
            required: [true, "Category name is required."],
            validate: {
                validator: function (name) {
                    return name.trim().length > 0
                },
                message: "Category name cannot be blank."
            }
        },
        createdAt: {
            type: Date,
            default: new Date()
        }
    }
)

const Category = mongoose.model("Category", categorySchema);

export default Category;