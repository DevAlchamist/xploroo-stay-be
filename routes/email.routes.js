const express = require("express");
const handleEmail = require("../controllers/email.controller");

const router = express.Router();
router.post("/send", handleEmail);
module.exports = router;
