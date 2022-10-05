const db = require("../helper/db_connection")

module.exports = {
    get: function(req, res) {
        return new Promise((resolve, reject) => {
            const {sortBy = "seat", order = "ASC"} = req.query
            const {id_booking} = req.params

            const sql = `SELECT * FROM seat_booking WHERE id_booking = ${id_booking} ORDER BY ${sortBy} ${order}`

            db.query(sql, (err, result) => {
                if (err) {
                    reject({
                        messsage: "error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve({
                        messsage: "Success",
                        status: 200,
                        data: result
                    })
                }
            })
        })
    },
    add: function(req, res) {
        return new Promise((resolve, reject) => {
            const { id_booking, seat_choosed} = req.body

            const sql = `INSERT INTO seat_booking ( id_booking, seat_choosed) VALUES (${id_booking}, ${seat_choosed})`

            db.query(sql, (err, result) => {
                if (err) {
                    reject ({
                        messsage: "error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve ({
                        messsage: "Success",
                        status: 200,
                        data: result
                    })
                }
            })
        })
    },
    update: function(req, res) {
        return new Promise((resolve, reject) => {
            const { seat_choosed } = req.body
            const { id_booking_seat } = req.params

            const sql = `UPDATE seat_booking SET seat_choosed = '${seat_choosed}' WHERE id_booking_seat = '${id_booking_seat}'`

            db.query(sql, (err, result) => {
                if(err) {
                    reject({
                        messsage: "error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve({
                        messsage: "Success",
                        status: 200,
                        data: result
                    })
                }
            })
        })
    },
    remove: function (req, res) {
        return new Promise((resolve, reject) => {
            const {id_booking} = req.params
            const {seat_choosed} = req.query

            const sql = `DELETE FROM seat_booking WHERE id_booking = ${id_booking} AND seat = '${seat_choosed}'`

            db.query(sql, (err, result) => {
                if (err) {
                    reject ({
                        messsage: "error",
                        status: 500,
                        detail: err
                    })
                } else {
                    resolve ({
                        messsage: "Success",
                        status: 200,
                        data: result
                    })
                }
            })
        })
    }
}