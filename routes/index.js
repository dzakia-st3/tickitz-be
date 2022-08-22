const express = require("express");
const app = express()
const movieRoutes = require('./movieRoutes')
const bookingRoutes = require('./bookingRoutes')
const scheduleRoutes = require('./scheduleRoutes')
const authRoute = require('./authRoute')
const userRoutes = require('./userRoutes')
// const categoryRoutes = require('./categoryRoutes')



app.use('/movie', movieRoutes)
app.use('/booking', bookingRoutes)
app.use('/schedule', scheduleRoutes)
app.use('/auth', authRoute)
app.use('/user', userRoutes)
// app.use('/category', categoryRoutes)


module.exports = app