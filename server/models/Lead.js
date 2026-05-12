const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    email: String,
    company: String,
    role: String,
    auditId: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Lead",
  LeadSchema
);