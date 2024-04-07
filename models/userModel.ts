import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String
    },
    isVerfied: {
        type: Boolean
    },
    isAdmin: {
        type: String,
        default: "false"
    },
    accessToken: {
        type: String
    },
    photo: {
        type: String
    },
    accessTokenExpiry: {
        type: Number
    },
    isPrivate:{
        type: String,
        default: "true"
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;