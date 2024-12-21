import db from '../config/sequalize.js'

export default db.sequelize.define(
  'user',
  {
    id: {
      type: db.Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: db.Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: db.Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
      isEmail: true,
      },
    },
    password: {
        type: db.Sequelize.STRING,
        allowNull: false,
      },
    
    // createdAt: {
    //   type: db.Sequelize.DATE,
    //   defaultValue: db.Sequelize.NOW,
    // },
    // updatedAt: {
    //   type: db.Sequelize.DATE,
    //   defaultValue: db.Sequelize.NOW,
    // },
  }, { 
    timestamps: true,
    tableName: 'user' });
