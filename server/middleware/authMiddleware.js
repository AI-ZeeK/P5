import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import UserSchema from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// Get token from header
			token = req.headers.authorization.split(" ")[1];

			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			// get user from token
			req.user = await UserSchema.findById(decoded.id).select("-password");

			next();
		} catch (err) {
			console.log(err);
			res.status(401);
			throw new Error("Not authorized");
		}
	}
	if (!token) {
		res.status(401);
		throw new Error("Not authorized , no token");
	}
});
