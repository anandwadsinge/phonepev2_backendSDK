const express = require("express");
const router = express.Router();
const { payment, callback } = require("../controller/phonepe");
const { tokenHandler } = require("../controller/auth");

router.post("/authToken", tokenHandler); 
router.post("/standardPayment", payment); 
router.post("/callback", callback);

module.exports = router;
