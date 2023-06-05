'use strict'
const taskServices = require('../services/taskServices')

const getAll = async(req, res, next) =>{
	return taskServices.getAll(req.query)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const createTask = async(req,res, next) =>{
	return taskServices.create(req)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const updateTask = async(req,res,next) =>{
	return taskServices.update(req)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const deleteTask = async(req, res,next)=>{
	return taskServices.deleteData(req.params.id)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

module.exports = {
    getAll,
	createTask,
	updateTask,
	deleteTask
}