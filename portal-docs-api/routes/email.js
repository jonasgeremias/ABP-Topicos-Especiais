const router = require("express").Router();

const emailController = require("../controllers/email");

router.post("/send/:id", emailController.sendEmail);

// exporting routes to use in app
module.exports = router;
