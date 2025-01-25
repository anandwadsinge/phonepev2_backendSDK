const mongoose = require("mongoose");

const callbackSchema = new mongoose.Schema(
  {
    event: { type: String, required: true }, // The event type (e.g., "checkout.order.completed")
    payload: { type: Object, required: true }, // The full payload object from the callback
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

module.exports = mongoose.model("CallbackResponse", callbackSchema);
