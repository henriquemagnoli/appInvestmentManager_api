require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(router)

app.listen(process.env.PORT,() => {
    console.log("API Rodando")
})