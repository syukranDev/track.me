module.exports = (sequelize, Sequelize) => {
  var Receipts = sequelize.define('receipts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    transaction_id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      // primaryKey: true
    },
    filename: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    image_data: {
      type: Sequelize.BLOB,
    },
    assignedToUserId:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    file_ext:{
      type: Sequelize.TEXT,
      allowNull: true
    },
    alt_direct_link:{
      type: Sequelize.TEXT,
      allowNull: true
    }
  },{
    timestamps: true,
    // underscored: true,
    freezeTableName: true
  });
  return Receipts;
}
