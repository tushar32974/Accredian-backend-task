import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      location,
      occupation,
    } = req.body;

    // Hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);


    // Use Sequelize create method to insert a new user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      location,
      occupation
    });

    // Send the created user in the response
    res.status(201).json(newUser);
  } catch (err) {
    // Handle validation errors and other errors during the process
    if (err.name === "SequelizeValidationError") {
      // Validation error (e.g., unique constraint violated)
      res.status(400).json({ error: "Validation Error", details: err.errors });
    } else {
      // Other errors
      console.error(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Use Sequelize findOne method to find a user by email
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials." });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Remove password from the user object before sending the response
    const userWithoutPassword = { ...user.get(), password: undefined };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    // Handle any errors that occurred during the process
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
