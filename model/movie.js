const db = require('../helper/db_connection')
const fs = require('fs')

module.exports = {
  get: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title = '', categories = '', release_date = '', sortBy = '', page = 1, limit = 5 } = req.query
      const offset = (page - 1) * limit

      const sql = `SELECT * FROM moviedetails ${title && categories && release_date ?
        `WHERE title LIKE '%${title}%' AND categories LIKE '%${categories}%' AND release_date LIKE '%${release_date}%'` : title ? `WHERE title LIKE '%${title}%' ORDER BY title ${sortBy} ` : categories ? `WHERE categories LIKE '%${categories}%' ORDER BY title ${sortBy}` : release_date ? `WHERE release_date LIKE '%${release_date}%' ORDER BY title ${sortBy}` : ''} LIMIT ${limit} OFFSET ${offset}`

      // 'SELECT moviedetails.image, moviedetails.title, CONCAT (category1,category2, category3) AS categories, moviedetails.release_date, moviedetails.directed_by, moviedetails.duration, moviedetails.cast, moviedetails.synopsis FROM categories RIGHT OUTER JOIN moviedetails ON categories.id=moviedetails.id GROUP BY moviedetails.id'

      // 'SELECT * FROM `moviedetails`'   

      // `SELECT * FROM moviedetails ${title ? `WHERE title LIKE '%${title}%'`: title && director ? `WHERE title LIKE '%${title}%' AND director LIKE '${director}%'`:''}`

      db.query(sql, (err, result) => {
        console.log(result, 'hasil1')
        if (err) {
          console.log(err)
          reject({ message: "error" })
        }
        if (!result.length) {
          reject({
            message: "Data not found",
            data: result
          })
        }
        const results = {
          result,
          ...req.body
        }
        console.log(results, 'eheeeeee')
        db.query(`SELECT * FROM moviedetails`, (err, result) => {
          if (err) {
            reject({ message: "data not found" })
          }
          totalRows = result.length
          totalPage = Math.ceil(totalRows / limit)

          resolve({
            message: "get all form movies success",
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
  },
  getById: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      const sql = `SELECT * FROM moviedetails WHERE id = '${id}'`

      // ${id ? `WHERE id LIKE '${id}'`: id ? `WHERE id LIKE '${id}'`:''}`

      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          reject({ message: "ada error" })
        }
        resolve({
          message: "get movies by id success",
          status: 200,
          data: result
        })
      })
    })
  },
  getSort: (req, res) => {
    return new Promise((resolve, reject) => {
      const { title = '', categories = '', sortBy = '' } = req.query
      const sql = `SELECT * FROM moviedetails ${title && categories ?
        `WHERE title LIKE '%${title}%' AND categories LIKE '%${categories}%'` : title ? `WHERE title LIKE '%${title}%' ORDER BY title ${sortBy} ` : categories ? `WHERE categories LIKE '%${categories}%' ORDER BY title ${sortBy}` : ''}`

      // ${id ? `WHERE id LIKE '${id}'`: id ? `WHERE id LIKE '${id}'`:''}`

      db.query(sql, (err, result) => {
        if (err) {
          reject({ message: "ada error" })
        }
        if (!result.length) {
          reject({
            message: "Data not found",
            data: result
          })
        }
        resolve({
          message: "get movies by id succes",
          status: 200,
          data: result
        })
      })
    })
  }, add: (req, res) => {
    return new Promise((resolve, reject) => {
      const { image, title, categories, release_date, directed_by, duration_hour, duration_minute, cast, synopsis } = req.body

      db.query(`INSERT INTO moviedetails(image, title, categories, release_date, directed_by, duration_hour, duration_minute, cast, synopsis) VALUES('${image}', '${title}', '${categories}', '${release_date}', '${directed_by}', '${duration_hour}', '${duration_minute}', '${cast}', '${synopsis}')`, (err, results) => {
        if (err) {
          console.log(err)
          reject({ message: "error" })
        }
        resolve({
          message: "add new movies success",
          status: 200,
          data: {
            ...req.body,
          }
        })
      })
    })
  }, update: (req, res) => {
    return new Promise((resolve, reject) => {
      const { id } = req.params
      const sql = `SELECT * FROM moviedetails where id = ${id}`

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
        let image = previousData.image

        fs.unlink(`./uploads/${image}`, function (err) {
          if (err?.code == 'ENOENT') {
            previousData.image = req.file.filename

            const { image, title, categories, release_date, directed_by, duration_hour, duration_minute, cast, synopsis } = previousData

            db.query(`UPDATE moviedetails SET image = '${image}', title = '${title}', categories = '${categories}', release_date = '${release_date}', directed_by = '${directed_by}', duration_hour = '${duration_hour}', duration_minute = '${duration_minute}', cast = '${cast}', synopsis = '${synopsis}' WHERE id = ${id}`, (err, result) => {
              if (err) {
                console.log(err)
                reject({ message: "error" })
              }
              resolve({
                message: "update movies successfully",
                status: 200,
                data: result
              })
            })
          } else if (err) {
            console.log(err)
            return res.status(400).send({ message: "error delete file" })
          } else {
            previousData.image = req.file.filename

            const { image, title, categories, release_date, directed_by, duration_hour, duration_minute, cast, synopsis } = previousData

            db.query(`UPDATE moviedetails SET image = '${image}', title = '${title}', categories = '${categories}', release_date = '${release_date}', directed_by = '${directed_by}', duration_hour = '${duration_hour}', duration_minute = '${duration_minute}', cast = '${cast}', synopsis = '${synopsis}' WHERE id = ${id}`, (err, result) => {
              if (err) {
                console.log(err)
                reject({ message: "error" })
              }
              resolve({
                message: "update movies successfully",
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
      db.query(`SELECT image FROM moviedetails WHERE id=${id}`, (err, resultData) => {
        if (err) {
          console.log(err)
        }
        if (!resultData.length) {
          reject({ message: "id not found" })
        } else {
          let image = resultData[0].image
          db.query(`DELETE FROM moviedetails WHERE id=${id}`, (err, results) => {
            if (err) { reject({ message: "error" }) }
            fs.unlink(`./uploads/${image}`, function (err) {
              if (err) resolve({
                message: "delete movies successfully",
                status: 200,
                data: results
              });
              resolve({
                message: "delete movies successfully",
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