import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Use Sequelize findOne method to find a user by id
    const user = await User.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      // User found, send it in the response
      res.status(200).json(user);
    } else {
      // User not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    // Handle any errors that occurred during the process
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



