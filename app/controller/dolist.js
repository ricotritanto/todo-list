'use strict'
const dolistServices = require('../services/dolistServices')

const getAll = async(req, res, next) =>{
	return dolistServices.getAll(req.query)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const getbyID = async(req, res, next) =>{
	return dolistServices.getbyID(req.params.id)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const createDolist = async(req,res, next) =>{
	return dolistServices.create(req)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const updateDolist = async(req,res,next) =>{
	return dolistServices.update(req)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

const deleteDolist = async(req, res,next)=>{
	return dolistServices.deleteData(req.params.id)
		.then(result => res.status(result.status).send(result))
		.catch(err => next(err))
}

module.exports = {
    getAll,
	createDolist,
	updateDolist,
	deleteDolist,
	getbyID
}