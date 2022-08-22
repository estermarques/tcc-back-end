export default (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      text: {
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.STRING,
      }
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  comment.associate = function associateModels(models) {
    comment.belongsTo(models.project,  { foreignKey: 'id'});
    comment.belongsTo(models.user,  { foreignKey: 'id'});
  };

  return comment;
};