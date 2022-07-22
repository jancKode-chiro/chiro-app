const express = require("express")
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.json({
      status: 200,
      message: "Get data succesfful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});