import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    emailVerifyOtp: {
        type: String, 
        default: ''
    },
    emailVerifyOtpExpireAt: {
        type: Number,
        default: 0
    },
    passwordResetOtp: {
        type: String, 
        default: ''
    },
    passwordResetOtpExpireAt: {
        type: Number,
        default: 0
    },
    avatar: {
        type:String,
        default: ''
    }
});

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;