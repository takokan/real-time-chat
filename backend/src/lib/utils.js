import jwt from "jsonwebtoken";

export const generateToken = (userID, res) => {
    const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("uid", token);

    return token;
}