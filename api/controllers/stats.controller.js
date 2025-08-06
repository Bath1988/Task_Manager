const db = require("../models");
const Phones = db.phones;
const Contacts = db.contacts;
const Op = db.Sequelize.Op;

// Calculate stats

// Most recently created contact
exports.findAll = (req, res) => {
    Contacts.findAll(sequelize.fn('max', sequelize.col('createdAt')))
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};
//sequelize.fn('max', sequelize.col('age')),
// Number of phone numbers

exports.findAll = (req, res) => {
    Contacts.findAll()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// number of contacts


exports.findAll = (req, res) => {
    Contacts.count()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

//oldest entry
exports.findAll = (req, res) => {
    Contacts.findAll(sequelize.fn('min', sequelize.col('createdAt')))
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};
