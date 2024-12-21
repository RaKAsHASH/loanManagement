import db from '../config/sequalize.js'

export default db.sequelize.define(
  'loan',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: db.Sequelize.DECIMAL,
      allowNull: false,
    },
    interestRate:{
        type: db.Sequelize.DECIMAL,
        allowNull: false,
    },    
    tenure:{
        type: db.Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
      type: db.Sequelize.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    remarks:{
      type: db.Sequelize.TEXT,
    },
    userId: {
      type: db.Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },

  }, { 
    timestamps: true,
    tableName: 'loan' });
