const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  return res.status(200).json({
    title: "Express Testing",
    message: "Server is working",
  });
});

module.exports = router;