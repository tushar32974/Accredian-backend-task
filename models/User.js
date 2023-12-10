import { DataTypes } from "sequelize";
import sequelize from "../config/db.js"; // Assuming you have a separate file for Sequelize initialization

const User = sequelize.define(
  "User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 50],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [2, 50],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, Infinity],
      },
    },
    picturePath: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    location: {
      type: DataTypes.STRING,
    },
    occupation: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: true,
  }
);

export default User;
