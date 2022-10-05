const Seat = require("../model/seatBooking")

module.exports = {
    getSeat: async function (req, res) {
        try {
            result = await Seat.get(req, res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err) : res.status(500).send({
                message: "Server error",
                status: 500
            })
        } 
    },
    addSeat: async function (req, res) {
        try {
            result = await Seat.add(req, res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err) : res.status(500).send({
                message: "Server error",
                status: 500
            })
        }
    },
    updateSeat: async function (req, res) {
        try {
            result = await Seat.update(req, res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err) : res.status(500).send({
                message: "Server error",
                staus: 500
            })
        }
    },
    removeSeat: async function (req, res) {
        try {
            result = await Seat.remove(req, res)
            return res.send(result)
        } catch (err) {
            err.status ? res.status(err.status).send(err) : res.status(500).send({
                message: "Server error",
                status: 500
            })
        }
    }
}