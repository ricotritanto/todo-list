'use strict'
const {models} = require('../models')
const {Op } = require('sequelize')

const getAllDolist = async(data,limit =10, offset = 0)=>{
	const { name } = data
	var condition = name ? { name: { [Op.like]: `%${name}%` } } : null
	return await models.todolist.findAndCountAll({ 
		where: condition,
		limit:parseInt(limit),
		offset: (offset <= 1) ? 0 : ((offset - 1) * parseFloat(limit)),
		order:[['name', 'DESC']],
		include:[
			{
				model: models.task,
				as:'task',
				required:true,
				// where: whereCust,
				attributes:['id','name']
				
			}
			],
	 })
		.catch(ex => {
			throw ex
		})
}

const createDolist = async(req)=>{
	console.log(req.body)
	try {
		await models.todolist.create({
			taskId:req.body.task,
			name:req.body.name,
			description:req.body.description,
			status:req.body.status,
			due_date:req.body.dueDate,
		})
	} catch (error) {
		console.log(error)
		return error
	}
}

const getbyID = async(req) =>{
	return await models.todolist.findOne({
		where: {
			id:req,
			deleted_at: null
		}
	})
}

const findOne = async(req) =>{
	return await models.todolist.findOne({
		where: {
			name:req.body.name.toLowerCase(),
			deleted_at: null
		}
	})
}
const find = async(req) =>{
	return await models.todolist.findOne({
		where: {
			id:req.params.id,
			deleted_at: null
		}
	})
}

const findData = async(dolistName,req, search = {},specificWhere = []) =>{
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
	  return await models.todolist.findAndCountAll(cond)
		.catch(ex => {
			throw ex
		})
}

const updateById = async(req)=>{
	return await models.todolist.update({
		name:req.body.name.toLowerCase(),
		taskId:req.body.task,
		description:req.body.description,
		status:req.body.status,
		due_date:req.body.dueDate,
	}
	,{
		where:{id:req.params.id}
	})
}

const deleteDolist = async(req)=>{
	return await models.todolist.destroy({
		where:{id:req.params.id}
	})
}


module.exports={
    getAllDolist,
	createDolist,
	findOne,
	updateById,
	deleteDolist,
	find,
	findData,
	getbyID
}