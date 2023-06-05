'use strict'
const {models} = require('../models')
const {Op } = require('sequelize')

const getAllTask = async(data,limit =10, offset = 0)=>{
	const { name } = data
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null
	return await models.task.findAndCountAll({ 
		where: condition,
		limit:parseInt(limit),
		offset: (offset <= 1) ? 0 : ((offset - 1) * parseFloat(limit)),
		order:[['name', 'DESC']]
	 })
		.catch(ex => {
			throw ex
		})
}

const createTask = async(req)=>{
	return await models.task.create({
		name:req.body.name.toLowerCase(),
		description:req.body.description,
	})
}
const findData = async(page, perpage,search = {},specificWhere = []) =>{
	let where = {
		deleted_at: null,
	}
	if (Object.keys(search).length > 0) {
		where[Op.or]= []
		for (const [key, value] of Object.entries(search)) {
			const src = {}
			src[key] = {
				[Op.like]: '%'+value+'%'
			}
			where[Op.or].push(src)
		}

		Object.assign(where)
	}
	if(specificWhere.length > 0) {
		specificWhere.map(v => Object.assign(where, v))
	}
	const cond = {
		where,
	}
	return await models.task.findAndCountAll(cond)
		.catch(ex => {
			throw ex
		})
}
const find = async(req) =>{
	return await models.task.findOne({
		where: {
			id:req.params.id,
			deleted_at: null
		}
	})
}
const findById = async(req) =>{
	return await models.task.findOne({
		where: {
			id:req.body.task_id,
			deleted_at: null
		}
	})
}

const findOne = async(req) =>{
	return await models.task.findOne({
		where: {
			name:req.body.name.toLowerCase(),
			deleted_at: null
		}
	})
}

const updateById = async(req)=>{
	return await models.task.update({
		name:req.body.name.toLowerCase(),
		description:req.body.description,
	}
	,{
		where:{id:req.params.id}
	})
}

const deleteTask = async(req)=>{
	return await models.task.destroy({
		where:{id:req}
	})
}



module.exports = {
    getAllTask,
	createTask,
	findData,
	find,
	findOne,
	updateById,
	deleteTask,
	findById
}