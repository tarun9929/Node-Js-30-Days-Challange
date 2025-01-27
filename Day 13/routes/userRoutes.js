const express = require("express");
const { generateShortUrl, shortUrl } = require("../controllers/userRoutes");

const router = express.Router();

router.get("/", generateShortUrl);

router.get("/:shortId", shortUrl);

module.exports = router;
