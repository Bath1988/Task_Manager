const db = require("../models");
const People = db.people;
const Task = db.tasks;
const Op = db.Sequelize.Op;

// Create person
exports.create = (req, res) => {
    const person = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        job: req.body.job,
    };

    People.create(person)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get all people
exports.findAll = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
    const offset = req.query.offset ? parseInt(req.query.offset) : undefined;
    const options = { order: [['createdAt', 'DESC']] };
    if (limit !== undefined) options.limit = limit;
    if (offset !== undefined) options.offset = offset;

    People.findAll(options)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one person by id
exports.findOne = (req, res) => {
    const id = req.params.personId;
    People.findByPk(id)
    .then(person => {
        if (person) {
            res.send(person);
        } else {
            res.status(404).send({ message: `Person with id=${id} not found` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Person with id=" + id
        });
    });
};

// Update one person by id
exports.update = (req, res) => {
    const id = req.params.id;

    People.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Person was updated successfully." });
        } else {
            res.send({ message: `Cannot update Person` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Person with id=" + id
        });
    });
};

// Delete one person by id
exports.delete = (req, res) => {
    const id = req.params.id;

    People.destroy({ where: { id: id } })
    .then(num => {
        if (num == 1) {
            res.send({ message: "Person was deleted successfully!" });
        } else {
            res.send({ message: `Cannot delete Person` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Person with id=" + id
        });
    });
};

// Get latest person
exports.findLatest = (req, res) => {
    People.findOne({ order: [['createdAt', 'DESC']] })
    .then(person => {
        if (!person) {
            return res.status(404).send({ message: "No people found" });
        }
        res.send(person);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the latest person"
        });
    });
};