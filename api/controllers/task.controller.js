const db = require("../models");
const Task = db.tasks;
const People = db.people;
const Op = db.Sequelize.Op;

// Create task
exports.create = (req, res) => {
    const task = {
        action: req.body.action,
        remarks: req.body.remarks,
        personId: req.body.personId
    };

    Task.create(task)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all tasks
exports.findAll = (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    Task.findAll({ order: [['id', 'DESC']], limit, offset })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one task by id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Task.findByPk(id)
    .then(task => {
        if (task) {
            res.send(task);
        } else {
            res.status(404).send({ message: `Task with id=${id} not found` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Task with id=" + id
        });
    });
};

// Update one task by id
exports.update = (req, res) => {
    const id = req.params.id;

    Task.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Task was updated successfully." });
        } else {
            res.send({ message: `Cannot update Task` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Task with id=" + id
        });
    });
};

// Delete one task by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Task.destroy({ where: { id: id } })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Task was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Task` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Task with id=" + id
        });
    });
};