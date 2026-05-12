require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

const app = express();
const Audit = require("./models/Audit");
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/audit", (req, res) => {
  res.json({
    success: true,
    message: "Audit API working"
  });
});
app.post("/save-audit", async (req, res) => {
  try {
    const { tools, results } = req.body;

    const audit = await Audit.create({
      tools,
      results,
    });

    res.json({
      success: true,
      auditId: audit._id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});