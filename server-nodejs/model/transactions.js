module.exports = (sequelize, Sequelize) => {
  var Transactions = sequelize.define('transactions', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.TEXT,
    },
    desc: {
      type: Sequelize.TEXT,
    },
    categories:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    type:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    payment_method:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    total_amt:{
      type: Sequelize.REAL,
      allowNull: false
    }, 
    status:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    upload_date:{
      type: Sequelize.DATE,
      allowNull: true
    },
    assignedToUserId:{
      type: Sequelize.TEXT,
      allowNull: true
    }
  },{
    timestamps: true,
    // underscored: true,
    freezeTableName: true
  });
  return Transactions;
}
