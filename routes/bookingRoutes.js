const express = require ("express")
const {getAllBooking, getBookingById, addNewBooking, updateBooking, deleteBooking} = require('../controller/bookingController')
const router = express.Router ()

router.get('/', getAllBooking)
router.post('/', addNewBooking)
router.get('/:id', getBookingById)
router.patch('/:id', updateBooking)
router.delete('/:id', deleteBooking)


module.exports = router