const mongoose = require("mongoose");

async function connectDatabase() {
  return await mongoose.connect("mongodb://127.0.0.1:27017/nodedb");
}

module.exports = connectDatabase;
