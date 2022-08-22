const db = require('../helper/db_connection')

module.exports = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT user.full_name, user.email, user.phone_number, orderpage.movie_selected, orderpage.schedule_selected, booking.cinema_name, booking.number_of_tickets, booking.total_payment, booking.payment_method FROM user INNER JOIN orderpage INNER JOIN booking ON user.id=orderpage.id=booking.id'
    
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject({message: "ada error"})
                }
                resolve({
                    message: "get all booking succes",
                    status: 200,
                    data: result
                })
            })   
        })
}, add : (req, res) => {
    return new Promise((resolve, reject) => {
        const {cinema_name, number_of_tickets, total_payment, payment_method} = req.body

        const sql = `INSERT INTO booking (cinema_name, number_of_tickets , total_payment, payment_method) VALUES ('${cinema_name}', '${number_of_tickets}', '${total_payment}', '${payment_method}')`
        
        db.query(sql, (err, result) => {
            if(err) {
                reject({message: "ada error"})
            }
            resolve({
                message: "add booking succes",
                status: 200,
                data: result
            })
        })   
    })
}, update : (req, res) => {
    return new Promise((resolve, reject) => {
        const {id} = req.params 
        const sql = `SELECT * FROM booking where id = ${id}`
    
            db.query(sql, (err, result) => {
                if(err) {
                    reject({message: "ada error"})
                }
                const previousData = {
                    ...result[0],
                    ...req.body
                }
                
                const {cinema_name, number_of_tickets, total_payment, payment_method} = previousData
                
                db.query(`UPDATE booking SET cinema_name = '${cinema_name}', number_of_tickets = '${number_of_tickets}', total_payment = '${total_payment}', payment_method = '${payment_method}' WHERE id = ${id}`, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.send({message: "ada error"})
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
        const {id} = req.params  
        const sql = `DELETE FROM booking where id = ${id}`

        db.query(sql, (err, result) => {
            if(err) {
                reject({message: "ada error"})
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