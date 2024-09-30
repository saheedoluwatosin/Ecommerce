


const express = require("express")
const { addproduct, register_admin, login_admin } = require("../Controller/control")
const validtokenadmin = require("../middleware/auth")

const router = express.Router()


router.post("/registeradmin",)
router.post("/addproduct",validtokenadmin,addproduct)
router.post("/registeradmin",register_admin)
router.post("/loginadmin",login_admin)



module.exports = router