module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: Sequelize.STRING
        },
        
    },{

            classMethods: {
                associate: function(models) {
                Contact.hasMany(models.Phone)
                
            
            }            

        }
    });
  
    return Contact;
};