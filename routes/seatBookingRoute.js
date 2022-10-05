const express = require("express")
const seatBookingController = require("../controller/seatBookingController")
const router = express.Router()

router.get("/:id", seatBookingController.getSeat)
router.post("/", seatBookingController.addSeat)
router.patch("/:id", seatBookingController.updateSeat)
router.delete("/:id", seatBookingController.removeSeat)

module.exports = router