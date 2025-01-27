const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  visitHistory: {
    timestemp: {
      type: Number,
    },
  },
});

const urlModel = mongoose.model("Url", urlSchema);

module.exports = urlModel;
