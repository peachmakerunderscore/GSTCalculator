const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");
const isTokenValid = require("../utils/token_verify");
const Items = require("../models/items");
const Purchases = require("../models/purchase");
// Adds Items description to inventory.
router.post("/additem", isTokenValid, async (req, res) => {
  const itemName = req.body.item;
  const price = req.body.price;
  const gstLevied = req.body.gst;
  if (itemName == null || price == null || gstLevied == null) {
    return res.json({
      status: 0,
      message: "Incomplete information provided. Please check your entries",
    });
  }

  const item = {
    itemName: itemName,
    price: price,
    gstLevied: gstLevied,
  };

  const addItem = await Items.create(item);
  if (addItem) {
    return res.json({
      status: 1,
      message: "Item has been added",
    });
  } else {
    return res.json({
      status: 0,
      message: "Item could not be added",
    });
  }
});
// Adds Items purchased to your purchased store.
router.post("/addpurchase", isTokenValid, async (req, res) => {
  const itemName = req.body.item;
  const userId = req.decodedJWT.user._id;
  if (itemName == null) {
    return res.json({
      status: 0,
      message: "Incomplete information provided. Please check your entries",
    });
  }

  const itemDescription = await Items.findOne({ itemName: itemName });

  if (itemDescription) {
    const finalBill = {
      itemName: itemDescription.itemName,
      price: itemDescription.price,
      gstLevied: itemDescription.gstLevied,
      final_price:
        itemDescription.price +
        (itemDescription.price * itemDescription.gstLevied) / 100,
    };
    const addPurchase = await Purchases.create(finalBill);
    if (addPurchase) {
      return res.json({
        status: 1,
        message: "Item Purchased",
      });
    } else {
      return res.json({
        status: 0,
        message: "Could not buy item",
      });
    }
  } else {
    console.log("Item not found, add in inventory");
  }
});

// Gets the bills
router.get("/getbill", isTokenValid, async (req, res) => {
  const itemsPurchased = await Purchases.find({});
  if (itemsPurchased.length == 0) {
    return res.json({
      status: 1,
      message: `You have ${itemsPurchased.length} on your purchased items`,
    });
  }

  if (itemsPurchased) {
    return res.json({
      status: 1,
      "items purchased": itemsPurchased,
    });
  }
});

module.exports = router;
