'use strict'
require('dotenv').config()
const taskRepo = require('../repository/taskRepo')
const dolistRepo = require('../repository/dolistRepo')
const sequelize = require('sequelize')
const { check, validationResult } = require('express-validator')

const getAll = async(data) =>{
	const dolist = await dolistRepo.getAllDolist(data,data.per_page,data.page)
	const result = {
		count: dolist.count,
		page:parseFloat(data.page),
		per_page: parseFloat(data.per_page),
		items: dolist.rows
	}
	return {
		status: 200,
		result
	}
}

const create = async(req)=>{
	// console.log(req.body)
	await check('task', 'task is required').notEmpty().run(req)
	await check('name', 'name is required').notEmpty().run(req)
	await check('status', 'status is required').notEmpty().run(req)
	await check('dueDate', 'dueDate is required').notEmpty().run(req)
	const result = validationResult(req)
	console.log(result)
	if (!result.isEmpty()) {
		return {
			status:422,
			message:result.errors.map((error) => error.msg)
		}
	}
	const checkIsExistCode = await dolistRepo.findOne(req)
	const checkTask = await taskRepo.findById(req)
	if(!checkTask)
		return{
			status:404,
			message:'task name not ready, Please create task name first!'
		}
	if(checkIsExistCode)
		return {
			status:400,
			message: req.body.name+' is already'
		}
	try {
		await dolistRepo.createDolist(req)
		return {
			status:201,
			message: 'success created data'
		}
	} catch (error) {
		console.log(error)
		return {
			status: 500,
			message: 'something went wrong'
		}
	}
}

const getbyID = async(req)=>{
	const dolist = await dolistRepo.getbyID(req)
	const result = {
		items: dolist
	}
	return {
		status:200,
		result
	}
}

const update = async(req)=>{
	await check('task', 'task is required').notEmpty().run(req)
	await check('name', 'name is required').notEmpty().run(req)
	await check('status', 'status is required').notEmpty().run(req)
	await check('dueDate', 'duedate is required').notEmpty().run(req)
	const result = validationResult(req)
	if (!result.isEmpty()) {
		return {
			status:422,
			message:result.errors.map(msg=>msg.msg)
		}
	}
	const dolistName = await dolistRepo.find(req)
	const checkTask = await taskRepo.findById(req)
	if(!checkTask)
		return{
			status:404,
			message:'task name not ready, Please create task name first!'
		}
	if(!dolistName) return{
		status:400,
		message: 'task name not found'
	}
	if(req.body.name != undefined && req.body.name != dolistName.name){
		const existingRecord = await dolistRepo.findData(1, 10, {}, [{name: req.body.name}])
		if (existingRecord.count >1) {
			return {
				status: 400,
				message: 'dolist name already exist!'
			}
		}
	}
	try {
		req.body.updated_at = sequelize.fn('NOW')
		await dolistRepo.updateById(req)
		return {
			status:201,
			message: 'success updating data'
		}
	} catch (error) {
		return {
			status: 500,
			message: 'something went wrong'
		}
	}
}

const deleteData = async(req) =>{
	try {
		await dolistRepo.deleteDolist(req)
		return {
			status:201,
			message: 'success updating data'
		}
	} catch (error) {
		return {
			status: 500,
			message: 'something went wrong'
		}
	}
}

module.exports = {
    getAll,
    create,
	deleteData,
	update,
	getbyID
}