const db = require('../helper/db_connection')

module.exports = {
    get: (req, res) => {
        return new Promise((resolve, reject) => {

            const sql = `SELECT id_movie, id_cinema, id_schedule, id_movie, date, place, cinema, addres, logo_cinema, GROUP_CONCAT(showtime.time) as showtime, price FROM schedule JOIN showtime ON schedule.id_cinema = showtime.cinema_id WHERE schedule.id_movie = showtime.movie_id GROUP BY schedule.id_schedule `

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }

                resolve({
                    message: "get all schedule by id succes",
                    status: 200,
                    data: result
                })
            })
        })
    }, getById: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.params
            const sql = `SELECT id_movie, id_cinema, id_schedule, id_movie, date, place, cinema, addres, logo_cinema, GROUP_CONCAT(showtime.time) as showtime, price FROM schedule JOIN showtime ON schedule.id_cinema = showtime.cinema_id WHERE schedule.id_movie = ${id} = showtime.movie_id GROUP BY schedule.id_schedule`
            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }
                resolve({
                    message: "get schedule id movie success",
                    status: 200,
                    data: result
                })
            })
        })
    }, addSchedule: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id_movie, date, place, id_cinema, cinema, addres, logo_cinema, price } = req.body

            const sql = `INSERT INTO schedule (id_movie, date, place, id_cinema, cinema, addres, logo_cinema, price) VALUES ('${id_movie}', '${id_cinema}', '${date}', '${place}', '${cinema}', '${addres}', '${logo_cinema}', '${price}')`

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }
                resolve({
                    message: "add schedule succes",
                    status: 200,
                    data: {
                        ...req.body,
                    }
                })
            })
        })
    }, addShowtime: (req, res) => {
        return new Promise((resolve, reject) => {
            const { movie_id, cinema_id, time } = req.body

            const sql = `INSERT INTO showtime (movie_id, cinema_id, time) VALUES ('${movie_id}', '${cinema_id}', '${time}')`

            db.query(sql, (err, result) => {
                if (err) {
                    console.log(err)
                    reject({ message: "server error" })
                }
                resolve({
                    message: "add showtime succes",
                    status: 200,
                    data: result
                })
            })
        })
    }, updateSchedule: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.params
            const sql = `SELECT * FROM schedule WHERE id_movie = ${id}`

            db.query(sql, (err, result) => {
                if (err) {
                    reject({ message: "error" })
                }
                if (result?.length == 0) {
                    reject({ message: "id not found" })
                }
                const previousData = {
                    ...result[0],
                    ...req.body
                }
                let logo_cinema = previousData.logo_cinema

                fs.unlink(`./uploads/${logo_cinema}`, function (err) {
                    if (err?.code == 'ENOENT') {
                        previousData.logo_cinema = req.file.filename

                        const { date, place, id_cinema, cinema, addres, logo_cinema, price } = previousData

                        db.query(`UPDATE schedule SET date = '${date}', place = '${place}', id_cinema = '${id_cinema}', cinema = '${cinema}', addres = '${addres}', logo_cinema = '${logo_cinema}', price = '${price}' WHERE id_movie = ${id}`, (err, result) => {
                            if (err) {
                                console.log(err)
                                reject({ message: "server error" })
                            }
                            resolve({
                                message: "update schedule successfully",
                                status: 200,
                                data: result
                            })
                        })
                    } else if (err) {
                        console.log(err)
                        return res.status(400).send({ message: "error delete file" })
                    } else {
                        previousData.logo_cinema = req.file.filename

                        const { date, place, id_cinema, cinema, addres, logo_cinema, price } = previousData

                        db.query(`UPDATE schedule SET date = '${date}', place = '${place}', id_cinema = '${id_cinema}', cinema = '${cinema}', addres = '${addres}', logo_cinema = '${logo_cinema}', price = '${price}' WHERE id_movie = ${id}`, (err, result) => {
                            if (err) {
                                console.log(err)
                                reject({ message: "server error" })
                            }
                            resolve({
                                message: "update schedule successfully",
                                status: 200,
                                data: result
                            })
                        })
                    }
                })
            })
        })
    }, remove: (req, res) => {
        return new Promise((resolve, reject) => {
            const { id } = req.params
            db.query(`SELECT logo_cinema FROM schedule WHERE id_schedule=${id}`, (err, resultData) => {
                if (err) {
                    console.log(err)
                }
                if (!resultData.length) {
                    reject({ message: "id not found" })
                } else {
                    let logo_cinema = resultData[0].logo_cinema
                    db.query(`DELETE FROM schedule, showtime WHERE schedule.id_movie = ${id} = showtime.movie_id`, (err, results) => {
                        if (err) { reject({ message: "error" }) }
                        fs.unlink(`./uploads/${logo_cinema}`, function (err) {
                            if (err) resolve({
                                message: "delete schedule successfully",
                                status: 200,
                                data: results
                            });
                            resolve({
                                message: "delete schedule successfully",
                                status: 200,
                                data: results
                            });
                        });
                    })
                }
            })
        })
    },
}