/**
 * Router for handling user-related operations.
 */
const express = require("express");
const User = require("../models/userModel");
const Cost = require("../models/costModel");

const router = express.Router();

/**
 * Get the details of a specific user.
 * @route GET /api/users/:id
 * @param {Object} req - The request object.
 * @param {string} req.params.id - The ID of the user.
 * @param {Object} res - The response object.
 * @returns {Object} The user's details and their total costs or an error message.
 */
// Get User Details
router.get("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const totalCosts = await Cost.aggregate([
      { $match: { userid: id } },
      { $group: { _id: null, total: { $sum: "$sum" } } },
    ]);

    const total = totalCosts[0]?.total || 0;

    res.json({
      first_name: user.first_name,
      last_name: user.last_name,
      id: user.id,
      total,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Create a new user.
 * @route POST /api/users/add
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object} The created user or an error message.
 */
router.post("/users/add", async (req, res) => {
  try {
    const { id, first_name, last_name, birthday, marital_status } = req.body;

    if (!id || !first_name || !last_name || !birthday || !marital_status) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ id });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const newUser = new User({
      id,
      first_name,
      last_name,
      birthday,
      marital_status,
    });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get the list of team members who developed the project.
 * @route GET /api/about
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Object[]} An array of team member details.
 */
// About Team
router.get("/about", (req, res) => {
  res.json([
    {
      first_name: "Paulo",
      last_name: "Monayer",
      id: "213372055",
      email: "monayer42@gmail.com",
    },
    {
      first_name: "Shilat",
      last_name: "Ivgi",
      id: "208107573",
      email: "Shilati172@gmail.com",
    },
  ]);
});

module.exports = router;
