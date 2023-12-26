module.exports = (sequelize, Sequelize) => {
  var Receipts = sequelize.define('receipts', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    filename: {
      type: Sequelize.TEXT,
    },
    image_data: {
      type: Sequelize.BLOB,
    },
    assignedToUserId:{
      type: Sequelize.TEXT,
      allowNull: false
    },
    file_ext:{
      type: Sequelize.TEXT,
      allowNull: false
    }
  },{
    timestamps: true,
    // underscored: true,
    freezeTableName: true
  });
  return Receipts;
}
