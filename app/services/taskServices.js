'use strict'
require('dotenv').config()
const taskRepo = require('../repository/taskRepo')
const sequelize = require('sequelize')
const { check, validationResult } = require('express-validator')

const getAll = async(data) =>{
	const tasks = await taskRepo.getAllTask(data,data.per_page,data.page)
	const result = {
		count: tasks.count,
		page:parseFloat(data.page),
		per_page: parseFloat(data.per_page),
		items: tasks.rows
	}
	return {
		status: 200,
		result
	}
}

const getbyID = async(req)=>{
	const task = await taskRepo.getbyID(req)
	const result = {
		items: task
	}
	return {
		status:200,
		result
	}
}
const create = async(req)=>{
	await check('name', 'name is required').notEmpty().run(req)
	const result = validationResult(req)
	if (!result.isEmpty()) {
		return {
			status:422,
			message:'task name is required'
		}
	}

	const checkIsExistCode = await taskRepo.findOne(req)
	if(checkIsExistCode)
		return {
			status:400,
			message: req.body.name+' is already'
		}
	try {
		await taskRepo.createTask(req)
		return {
			status:201,
			message: 'success created data'
		}
	} catch (error) {
		return {
			status: 500,
			message: 'something went wrong'
		}
	}
}

const update = async(req)=>{
	await check('name', 'name is required').notEmpty().run(req)
	const result = validationResult(req)
	if (!result.isEmpty()) {
		return {
			status:422,
			message:'task name is required'
		}
	}
	const taskName = await taskRepo.find(req)
	if(!taskName) return{
		status:400,
		message: 'task name not found'
	}
	if(req.body.name != undefined && req.body.name != taskName.name){
		const existingRecord = await taskRepo.findData(1, 10, {}, [{name: req.body.name}])
		if (existingRecord.count >1) {
			return {
				status: 400,
				message: 'task name already exist!'
			}
		}
	}
	try {
		req.body.updated_at = sequelize.fn('NOW')
		await taskRepo.updateById(req)
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
		await taskRepo.deleteTask(req)
		return {
			status:201,
			message: 'success updating data'
		}
	} catch (error) {
		console.log(error)
		return {
			status: 500,
			message: 'something went wrong'
		}
	}
}

module.exports={
    getAll,
    create,
	update,
	deleteData,
	getbyID
}