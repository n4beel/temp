var express = require('express');
const ctrl = require("./product.ctrl");
var router = express.Router();
router.get("/api/keywords/search",ctrl.productSearch);
router.post("/api/opportunity/finder",ctrl.opportunityFinder);
module.exports = router;