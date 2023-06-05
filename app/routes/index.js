'use strict'
const taskController = require('../controller/task')
const dolistController = require('../controller/dolist')
const { create } = require('../services/dolistServices')


module.exports = app =>{
	app.get('/api/health', (req, res) => {
		res.status(200).send({
			message: 'api is up and running',
		})
	})

	app.use(function(req, res, next) {
		res.header(
			'Access-Control-Allow-Headers',
			'x-access-token, Origin, Content-Type, Accept'
		)
		next()
	})


    //api task
    app.get('/api/task',taskController.getAll)
	app.post('/api/task',taskController.createTask)
	app.put('/api/task/:id',taskController.updateTask)	
	app.delete('/api/task/:id',taskController.deleteTask)

	//api task
    app.get('/api/dolist',dolistController.getAll)
	app.post('/api/dolist', dolistController.createDolist)
	app.put('/api/dolist/:id', dolistController.updateDolist)
	app.delete('/api/dolist/:id', dolistController.deleteDolist)
}