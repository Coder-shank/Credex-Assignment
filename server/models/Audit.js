const mongoose = require("mongoose");

const AuditSchema = new mongoose.Schema(
  {
    tools: Array,
    results: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Audit",
  AuditSchema
);