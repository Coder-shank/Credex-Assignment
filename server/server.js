require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Lead = require("./models/Lead");
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


app.get("/audit/:id", async (req, res) => {
  try {
    const audit = await Audit.findById(
      req.params.id
    );

    res.json(audit);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/save-lead", async (req, res) => {
  try {
    const { email, company, role, auditId } =
      req.body;

    await Lead.create({
      email,
      company,
      role,
      auditId,
    });

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});