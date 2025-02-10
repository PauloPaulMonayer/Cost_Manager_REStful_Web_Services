require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const costRoutes = require("./routes/costRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// התחברות למסד הנתונים
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", costRoutes);
app.use("/api", userRoutes);

// הפעלת השרת רק אם הקובץ מופעל ישירות
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
