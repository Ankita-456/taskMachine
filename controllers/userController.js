const user = require("../models/user");
const userDetail = require("../models/userDetail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//User - Register
const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password, addresses } = req.body;

        const exsistingUser = await user.findOne({ email });
        if (exsistingUser) {
            return res.status(400).json({
                message: "User alredy exist,please check this email!"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await user.create({
            name,
            email,
            password: hashedPassword,
            phone
        })
        const createUserDetail = await userDetail.create({
            userId: user._id,
            addresses
        });
        return res.status(200).json({
            message: "User register successfully!",
            createUser,
            createUserDetail
        });

    } catch (error) {
        return res.status(500).json({
            error: "Unexpected error,please try again later"
        })
    }
}

//User - Login
const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await user.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({
                message: "Invalid password,please check!"
            });
        }
        const token = jwt.sign(
            {
                userId: user._id
            },
            "your_jwt_secret", {
            expiresIn: "1h"
        });
        return res.status(200).json({
            message: "User login successfully!",
            token,
        });

    } catch (error) {
        return res.status(500).json({
            error: "Unexpected error,please try again later"
        })
    }
}
module.exports = {
    registerUser,
    userLogin
}