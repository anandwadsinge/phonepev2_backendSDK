const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema(
  {
    event: { type: String, required: true }, // The event type (e.g., "checkout.order.completed")
    payload: { type: Object, required: true }, // The full payload object from the callback
  },
  {
    timestamps: true,
    collection: "sdk_callback", // Explicitly specify the collection name
  } 
);

module.exports = mongoose.model("callbackresponses", callbackSchema);
