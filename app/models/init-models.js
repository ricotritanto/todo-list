var DataTypes = require('sequelize').DataTypes
var _task = require('./task')
var _todolist= require('./todolist')


function initModels(sequelize) {
	var task = _task(sequelize, DataTypes)
	var todolist = _todolist(sequelize, DataTypes)

	todolist.belongsTo(task, {as:'task', foreignKey:'taskId'})
	task.hasMany(todolist, {as:'todolist',foreignKey:'taskId'})

	return {
		task,
		todolist
	}
}
module.exports = initModels
module.exports.initModels = initModels
module.exports.default = initModels