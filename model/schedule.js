const db = require('../helper/db_connection')

module.exports = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            const {id} = req.params
            
            const sql = `SELECT moviedetails.id, date, place, cinema, addres, logo_cinema, GROUP_CONCAT(showtime.time) as showtime, price FROM schedule JOIN moviedetails ON schedule.id_movie = moviedetails.id JOIN showtime ON schedule.id_cinema = showtime.cinema_id = showtime.id_movie WHERE schedule.id_movie LIKE '%${id}%' GROUP BY schedule.id_schedule `
    
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject({message: "ada error"})
                }

                resolve({
                    message: "get all schedule by id succes",
                    status: 200,
                    data: result
                })
            })   
        })
},
    
//     get : (req, res) => {
//         return new Promise((resolve, reject) => {
//             const {id} = req.query
//             const sql = `SELECT * FROM showtime WHERE id_movie=${id}`
    
//             db.query(sql, (err, result) => {
//                 if(err) {
//                     console.log(err)
//                     reject({message: "ada error"})
//                 }
//                 resolve({
//                     message: "get all showtime by id succes",
//                     status: 200,
//                     data: result
//                 })
//             })   
//         })
// }, 

add : (req, res) => {
    return new Promise((resolve, reject) => {
        const {date, place, cinema, addres, logo_cinema, price} = req.body

        const sql = `INSERT INTO schedule (date, place, cinema, addres, logo_cinema, price) VALUES ('${date}', '${place}', '${cinema}', '${addres}', '${logo_cinema}', '${price}')`
        
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                reject({message: "ada error"})
            }
            resolve({
                message: "add schedule succes",
                status: 200,
                data: result
            })
        })   
    })
}, update : (req, res) => {
    return new Promise((resolve, reject) => {
        const {id_movie} = req.params 
        const sql = `SELECT * FROM schedule WHERE id_movie = ${id_movie}`
    
            db.query(sql, (err, result) => {
                if(err) {
                    reject({message: "ada error"})
                }
                const previousData = {
                    ...result[0],
                    ...req.body
                }
                
                const {date, place, cinema, addres, logo_cinema, price } = previousData
                
                db.query(`UPDATE schedule SET date = '${date}', place = '${place}', cinema = '${cinema}', addres = '${addres}', logo_cinema = '${logo_cinema}', price = '${price}' WHERE id_movie = ${id_movie}`, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.send({message: "ada error"})
                    }
                        res.status(200).send({
                        message: "update schedule succes",
                        status: 200,
                        data: result
                        })
                })
            }) 
    })
}, remove: (req, res) => {
    return new Promise((resolve, reject) => {
        const {id_movie} = req.params  
        const sql = `DELETE FROM schedule WHERE id_movie = ${id_movie}`

        db.query(sql, (err, result) => {
            if(err) {
                console.log(err)
                reject({message: "ada error"})
            }
            resolve({
                message: "delete schedule succes",
                status: 200,
                data: result
            })
        })   
    })
},
}