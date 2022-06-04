/* Importing the mongoose library. */
import mongoose from "mongoose";
/* This is creating a schema for the user model. */
const userSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    },
    {
        timestamps: true
    }
);
/* This is a way to check if the model already exists.
If it does, it will use the existing model.
If it doesn't, it will create a new model. */
const User = mongoose.models.User || mongoose.model('User', userSchema);
/* Exporting the User model. */
export default User;