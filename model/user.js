const db = require('../helper/db_connection')
const fs = require('fs')
const bcrypt = require('bcrypt');
const {useError} = require('../helper/message')

module.exports = {
    get : (req, res) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM `user`'
    
            db.query(sql, (err, result) => {
                if(err) {
                    console.log(err)
                    reject({message: "error"})
                }
                resolve({
                    message: "get all user success",
                    status: 200,
                    data: result
                })
            })   
        })
}, add : (req, res) => {
    return new Promise((resolve, reject)=> {
        const {first_name, last_name, full_name, email, password, phone_number, image} = req.body

        bcrypt.hash(password, 10, function (err, hashedPassword) {
            if (err) {
              console.log(err)
              reject({ message: "error" });
            } else {
              db.query(
                `INSERT INTO user(first_name, last_name, full_name, email, password, phone_number, image) VALUES('${first_name}', '${last_name}', '${full_name}', '${email}', '${hashedPassword}', '${phone_number}', '${image}')`,
                (err, results) => {
                  if (err) {
                    console.log(err)
                    reject(useError(err.code));
                  }
                  resolve({
                    message: "register successfully",
                    status: 201,
                    data: results,
                  });
                }
              );
            }
          });
    })
  }, update : (req, res) => {
    return new Promise((resolve, reject) => {
        const {id} = req.params 
        const sql = `SELECT * FROM user where id = ${id}`
    
            db.query(sql, (err, result) => {
                if(err) {
                    reject({message: "error"})
                } 
                if (result.length == 0) {
                    reject({message: "id not found"})
                }
                const previousData = {
                    ...result[0],
                    ...req.body
                }
                let image = previousData.image
                fs.unlink(`./uploads/profile/${image}`, function (err) {
                  if(err) {
                    console.log(err)
                    return res.status(400).send({message: "error delete file"})
                  } else {
                    previousData.image = req.file.filename

                    const {first_name, last_name, full_name, email, password, phone_number, image} = previousData
                    
                    db.query(`UPDATE user SET first_name = '${first_name}', last_name = '${last_name}', full_name = '${full_name}', email = '${email}', password = '${password}', phone_number = '${phone_number}', image = '${image}' WHERE id = ${id}`, (err, result) => {
                        if (err) {
                            console.log(err)
                            reject({message: "error"})
                        }
                            resolve({
                            message: "update user successfully",
                            status: 200,
                            data: result
                            })
                    })
                  }
                })
            }) 
    })
}, remove:(req, res)=> {
      return new Promise((resolve, reject)=> {
        const {id} = req.params
        db.query(`SELECT image FROM user WHERE id=${id}`, (err ,resultData) => {
          if(err) {
            console.log(err)
          }
          if(!resultData.length) {
            reject({message: "id not found"})
          }else {
            let image = resultData[0].image
            db.query(`DELETE FROM user WHERE id=${id}`,(err, results)=> {
              if(err) {reject({message: "error"})}
              fs.unlink(`./uploads/profile/${image}`, function (err) {
                if (err) resolve({
                  message: "delete user successfully",
                  status: 200,
                  data: results
                });
                resolve({
                  message: "delete user successfully",
                  status: 200,
                  data: results
                });
              });
            })
          }
        })
      })
    }
}