


const express = require("express")
const { addproduct, register_admin, login_admin, register_user, login_user, allproduct } = require("../Controller/control")
const validtokenadmin = require("../middleware/auth")

const router = express.Router()


router.post("/registeradmin",)
router.post("/addproduct",validtokenadmin,addproduct)
router.post("/registeradmin",register_admin)
router.post("/loginadmin",login_admin)
router.post("/register_user",register_user)
router.post("/loginuser",login_user)
router.get("/allproduct",allproduct)

module.exports = router