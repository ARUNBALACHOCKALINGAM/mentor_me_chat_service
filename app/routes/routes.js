const express = require("express");
const chatRouter = require("./chat.routes");
const router = express.Router();


// Authentication routes
// Root route
router.get("/health-check", (req, res) => {
    res.send("App is up and running");
});



router.use("/chat", chatRouter);



module.exports = router;
