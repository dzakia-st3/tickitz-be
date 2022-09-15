const db = require('../helper/db_connection')

module.exports = {
    get: (req, res) => {
        return new Promise((resolve, reject) => {
            const { page = 1, limit = 5 } = req.query
            const offset = (page - 1) * limit

            const sql = `SELECT user.full_name, user.email, user.phone_number, movie_selected, date_selected, time_selected, cinema_name, seat_choosed, number_of_tickets, total_payment, payment_method FROM booking JOIN user ON user.id=booking.id_user LIMIT ${limit} OFFSET ${offset}`

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }
                if (!result.length) {
                    reject({
                        message: "Data not found",
                        data: result
                    })
                    // console.log(result, 'booking1')
                }
                const results = {
                    result,
                    ...req.body
                }
                console.log(results, 'bookinggg')
                db.query(`SELECT * FROM booking`, (err, result) => {
                    if (err) {
                        reject({ message: "data not found" })
                    }
                    totalRows = result.length
                    totalPage = Math.ceil(totalRows / limit)

                    resolve({
                        message: "get all booking success",
                        status: 200,
                        data: {
                            ...results,
                            page: page,
                            limit: limit,
                            totalRows: totalRows,
                            totalPage: totalPage
                        }
                    })
                })
            })
        })
    }, getById: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.query
            const sql = `SELECT user.full_name, user.email, user.phone_number, movie_selected, date_selected, time_selected, cinema_name, seat_choosed, number_of_tickets, total_payment, payment_method FROM booking JOIN user ON user.id=booking.id_user WHERE id_user = '${id}'`

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }
                resolve({
                    message: "get booking by id success",
                    status: 200,
                    data: result
                })
            })
        })
    }, add: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id_user, movie_selected, date_selected, time_selected, cinema_name, seat_choosed, number_of_tickets, total_payment, payment_method } = req.body

            const sql = `INSERT INTO booking (id_user, movie_selected, date_selected, time_selected, cinema_name, seat_choosed, number_of_tickets, total_payment, payment_method) VALUES ('${id_user}', '${seat_choosed}', '${date_selected}', '${time_selected}', '${movie_selected}', '${cinema_name}', '${seat_choosed}', '${number_of_tickets}', '${total_payment}', '${payment_method}')`

            db.query(sql, (err, result) => {
                if (err) {
                    reject({ message: "server error" })
                }
                resolve({
                    message: "add booking succes",
                    status: 200,
                    data: result
                })
            })
        })
    }, update: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.params
            const sql = `SELECT * FROM booking WHERE id_user = ${id}`

            db.query(sql, (err, result) => {
                if (err) {
                    reject({ message: "server error" })
                }
                if (result?.length == 0) {
                    reject({ message: "id not found" })
                }
                const previousData = {
                    ...result[0],
                    ...req.body
                }

                const { movie_selected, date_selected, time_selected, cinema_name, seat_choosed, number_of_tickets, total_payment, payment_method } = previousData

                db.query(`UPDATE booking SET movie_selected = '${movie_selected}', date_selected = '${date_selected}', time_selected = '${time_selected}', cinema_name = '${cinema_name}', seat_choosed = '${seat_choosed}', number_of_tickets = '${number_of_tickets}', total_payment = '${total_payment}', payment_method = '${payment_method}' WHERE id = ${id}`, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.send({ message: "page not found" })
                    }
                    res.status(200).send({
                        message: "update booking succes",
                        status: 200,
                        data: result
                    })
                })
            })
        })
    }, remove: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.params
            const sql = `DELETE FROM booking WHERE id_booking = ${id}`

            db.query(sql, (err, result) => {
                if (err) {
                    reject({ message: "server error" })
                }
                resolve({
                    message: "delete booking succes",
                    status: 200,
                    data: result
                })
            })
        })
    },
}