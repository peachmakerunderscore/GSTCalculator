var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

var purchaseSchema = mongoose.Schema({
  itemName: {
    type: String,
  },

  price: {
    type: Number,
  },

  gstLevied: {
    type: Number,
  },

  final_price: {
    type: Number,
  },
});

var Purchases = mongoose.model("purchases", purchaseSchema);
module.exports = Purchases;
