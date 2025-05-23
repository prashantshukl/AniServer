import userModel from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    const {name, username, email, password} = req.body;

    if (!name || !username || !email || !password) {
        return res.json({success: false, message:"Please provide all the details"});
    }

    try {

        const existingUser = await userModel.findOne({email});

        if (existingUser) {
            return res.json({success: false, message: "user already exists with email"});
        }

        const existingUserWithUsername = await userModel.findOne({username});

        if (existingUserWithUsername) {
            return res.json({success: false, message: "username already taken"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = userModel({name, username, email, password: hashedPassword});
        await user.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 7*24*60*60*1000
        });

        return res.json({success: true, message: 'Account created successfully'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const login = async (req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        return res.json({success: false, message: "Please provide username and password"});
    }

    try {

        const user = await userModel.findOne({username});
        if (!user) {
            return res.json({success: false, message: "User not found with username"});
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            return res.json({success: false, message: 'Incorrect Password'});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true, 
            maxAge: 7*24*60*60*1000
        });

        return res.json({success: true, message: 'Logged in'});

    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token', {httpOnly: true});
        return res.json({success: true, message: 'Logged out'});
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}

const isUserAuthenticated = async (req, res) => {
    try {
        return res.json({success: true, message: "Authenticated"});
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}

const sendEmailVerifyOtp = async () => {

}

const verifyEmailVerifyOtp = async () => {

}

const sendPasswordResetOtp = async () => {

}

const verifyPasswordResetOtp = async () => {

}

export {register, login, logout, isUserAuthenticated, sendEmailVerifyOtp, verifyEmailVerifyOtp, sendPasswordResetOtp, verifyPasswordResetOtp};