import mongoose from "mongoose";

mongoose.connect(process.env.DB_CONNECTION_STRING)
    .then(() => console.log("Database connected successfuly."))
    .catch((error) => console.log("Failed to connect to database."))

let db = mongoose.connection;

export default db;