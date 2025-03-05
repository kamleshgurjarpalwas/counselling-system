const CollegeAuth = require("../../models/collegeModels/collegeAuth.model");
const CollegeSchema = require("../../models/collegeModels/collegeInfo.model")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateRegistrationId = async (collegeId) => {
    const year = new Date().getFullYear();
    let uniqueId;

    do {
        const randomStr = crypto.randomBytes(3).toString("hex").toUpperCase();
        const randomSuffix = crypto.randomBytes(2).toString("hex").toUpperCase();
        uniqueId = `${collegeId}-${randomStr}${year}${randomSuffix}`; // ex: IITKGP-A1B2C3-2025-F4D9
    } while (await CollegeAuth.findOne({ registrationId: uniqueId }));

    return uniqueId;

};

exports.registerCollege = async (req, res) => {
    try {
        const { collegeId, collegeName, collegeMail, password, collegeTag } = req.body;
        
        if (!collegeId || !collegeName || !collegeMail || !password || !collegeTag) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const existingCollege = await CollegeAuth.findOne({
            $or: [{ collegeId }, { collegeMail }, { collegeName }],
        });


        
        if (existingCollege) {
            return res.status(400).json({ message: "College already exists" });
        }
        const registrationId = await generateRegistrationId(collegeId);
        

        const newCollege = new CollegeAuth({
            registrationId,
            collegeId,
            collegeTag,
            collegeName,
            collegeMail,
            password,
        });
        
        await newCollege.save();
        
        const newCollegeSchema = new CollegeSchema({
            tag: collegeTag,
            collegeId,
            collegeName,
            collegeMail,
        });
        
        await newCollegeSchema.save();
        
        res.status(201).json({
            message: "College registered successfully",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



exports.loginCollege = async (req, res) => {
    try {
        const { registrationId, password } = req.body;

        if (!registrationId || !password) {
            return res.status(400).json({ message: "Registration ID and password are required" });
        }

        const college = await CollegeAuth.findOne({ registrationId }).select("+password");

        if (!college) {
            return res.status(404).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, college.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { collegeId: college.collegeId, registrationId: college.registrationId },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful",
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


exports.logoutCollege = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
            sameSite: "Strict",
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
