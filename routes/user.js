const express = require("express");
const router = express.Router();
const {
    sayHi
} = require('../controllers/index');

router.get("/", sayHi);

module.exports = router;