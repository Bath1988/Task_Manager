const db = require("../models");
const Phone = db.phones;
const Contact = db.contacts;
const Op = db.Sequelize.Op;

// Create phone
exports.create = (req, res) => {
    const num = {
        name: req.body.name,
        number: req.body.num
    };

    Phone.create(num)
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

// Get all phones

    exports.findAll = (req, res) => {
        Phone.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
    };


// Get one phone by id
exports.findOne = (req, res) => {
    exports.findOne = (req, res) => {
        const id = req.params.id;
        Phone.findByPk(id)
        .then(contact => {
            if (contact==1) {
                res.send(contact);       // Number found
            } else { 
                res.status(404).send({      // Number not found
                    message: `Phone with id=${id} not found`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving PhoneNo with id=" + id
            });
        });
    };
};

// Update one phone by id

    exports.update = (req, res) => {
        const id = req.params.id;
    
        Phone.update(req.body, {
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Number was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Number`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Number with id=" + id
            });
        });
    };


// Delete one phone by id

    exports.delete = (req, res) => {
        const id = req.params.id;
       
        Phone.destroy({where:{ id: id }})
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Contact was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Contact`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Contact with id=" + id
            });
        });
    }