export default (sequelize, DataTypes) => {
  const lessonLearned = sequelize.define('lessonLearned', {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      challenge: {
        type: DataTypes.STRING
      },
      solution: {
        type: DataTypes.STRING,
      },
      studyLinks: {
        type: DataTypes.STRING,
      },
      projectId: {
        type: DataTypes.STRING,
      }
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  lessonLearned.associate = function associateModels(models) {
    lessonLearned.belongsTo(models.project,  { foreignKey: 'id'});
  };

  return lessonLearned;
};