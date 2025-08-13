module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        action: {
            type: Sequelize.STRING
        },
        remarks: {
            type: Sequelize.STRING
        },
        personId: {
            type: Sequelize.INTEGER
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return Task;
};