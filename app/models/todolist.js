const Sequelize = require('sequelize')
module.exports = function(sequelize, DataTypes) {
	return sequelize.define('todolist', {
		id: {
			autoIncrement: true,
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
        taskId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'task',
				key: 'id'
			}
		},
		name: {
			type: DataTypes.STRING(150),
			allowNull: false
		},
		description: {
			type: DataTypes.TEXT(),
			allowNull: true
		},
		due_date: {
			type: Sequelize.DATEONLY,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.DATEONLY,
		},
        status: {
			type: DataTypes.ENUM('pending','progress','done'),
			allowNull: true
		},
		created_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
		},
		updated_at: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
		},
		deleted_at: {
			type: DataTypes.DATE,
			allowNull: true
		}
	}, {
		sequelize,
		tableName: 'todolist',
		timestamps: false,
		indexes: [
			{
				name: 'PRIMARY',
				unique: true,
				using: 'BTREE',
				fields: [
					{ name: 'id' },
				]
			},
            {
				name: 'task_FK',
				using: 'BTREE',
				fields: [
					{ name: 'taskId' },
				]
			},
		]
	})
}