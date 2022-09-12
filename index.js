require('dotenv').config()
const OneSignal = require('@onesignal/node-onesignal');
const express = require('express')
const app = express()
const port = process.env.PORT
const bodyParser = require('body-parser')
const router = require('./routes')
const cors = require('cors')
const path = require('path')

const appOS = new OneSignal.App();

// configure your application
appOS.name = 'tickitz-mobile';
appOS.gcm_key = 'AAAAQfY5kXo:APA91bEgHACWWAY8BA1pVgkRknuJahMrlDK38b1WCZ8m_fBQVZoegVN8vtAv1ENFvqCgNkjUrKMMDWzZjB-b99w4KaaV0gzF_Vfv2NDfaouAGjtyKgc32KRjfvfXsz-RH03Bm9hR4Xrv';
appOS.android_gcm_sender_id = '283303842170';

// const response = await client.createApp(appOS);

app.use(cors())

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/api/v1', router)

app.listen(port, () => {
  console.log(`Tickitz Backend listening on port ${port}`)
})
