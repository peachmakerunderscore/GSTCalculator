var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

var itemsSchema = mongoose.Schema({
  itemName: {
    type: String,
  },

  price: {
    type: Number,
  },

  gstLevied: {
    type: Number,
  },
});

var Items = mongoose.model("items", itemsSchema);
module.exports = Items;
