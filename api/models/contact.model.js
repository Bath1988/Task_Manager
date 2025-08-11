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
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    freezeTableName: true,
  });

  // Define associations in an associate method
  Contact.associate = (models) => {
    Contact.hasMany(models.Phone, {
      foreignKey: 'contactId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  
  return Contact;
};
