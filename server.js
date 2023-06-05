// const express = require ("express")
// const cors = require('cors')

// const app = express()

// var corsOptions = {
//     origin: "http://localhost:8081"
// }

// app.use(cors(corsOptions))
// app.use(express.json())

// app.use(express.urlencoded({extended:true}))

// app.get("/", (req,res)=>{
//     res.json({message: "welcome to app To DoList"})
// })

// // require("./app/routes/todolist.routes.js")
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, ()=>{
//     console.log(`app runinng on Port ${PORT}`)
// })

'use strict'
require('dotenv').config()
const express = require('express')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const Routes = require('./app/routes')
const path = require('path')


app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'resources')))

Routes(app)

// const db = require('./app/models')
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log('Drop and re-sync db.')
// })

// db.sequelize.sync()
const server = require('http').createServer(app) 
const PORT = process.env.PORT || process.env.APP_PORT || 3001
if (!module.parent) {
	server.listen(PORT, () => {
		console.log('Express Server Now Running. port:'+PORT)
	})
}
module.exports = app