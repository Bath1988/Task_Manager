const db = require("../models");
const Contact = db.contacts;
const Phone = db.phones;
const Op = db.Sequelize.Op;

// Create contact
exports.create = (req, res) => {
    const contact = {
        description: req.body.description,
    };

    Contact.create(contact)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred"
            });
        });
};

// Get all contacts
exports.findAll = (req, res) => {
    Contact.findAll({order: [ [ 'createdAt', 'DESC' ]]},)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred"
        });
    });
};

// Get one contact by id
exports.findOne = (req, res) => {
    const id = req.params.contactId;
    Contact.findByPk(id)
    .then(contact => {
        if (contact) {  // check if contact is not null
            res.send(contact);
        } else { 
            res.status(404).send({ message: `Contact with id=${id} not found` });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving Contact with id=" + id
        });
    });
};



// Update one contact by id
exports.update = (req, res) => {
    const id = req.params.id;

    Contact.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Contact`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error updating Contact with id=" + id
        });
    });
};

// Delete one contact by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Contact.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Task was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Task`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Task with id=" + id
        });
    });
};

// Get latest contact

exports.findLatest = (req, res) => {
    Contact.findOne({
        order: [['createdAt', 'DESC']]
    })
    .then(contact => {
        if (!contact) {
            return res.status(404).send({ message: "No contacts found" });
        }
        res.send(contact);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the latest contact"
        });
    });
};
/*
exports.findLatest = (req, res) => {
    // Just send test message for endpoint check
    res.send({ message: "Test OK - endpoint wired" });

    /*
    Contact.findOne({
        order: [['createdAt', 'DESC']]
    })
    .then(contact => {
        if (!contact) {
            return res.status(404).send({ message: "No contacts found" });
        }
        res.send(contact);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving the latest contact"
        });
    });
    
};
*/