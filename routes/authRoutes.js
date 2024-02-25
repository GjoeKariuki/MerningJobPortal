const express = require("express");
const { signup, signin, logout, userProfile } = require("../controllers/authController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();


// router.get("/", (req,res) => {
//     res.send("Hello from node js");
// });

// /api/signup
router.post("/signup", signup);
// /api/signin
router.post("/signin", signin);
// /api/logout
router.get("/logout", logout);

router.get("/me", isAuthenticated, userProfile)


module.exports = router