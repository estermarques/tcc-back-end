module.exports = (sequelize) => {
  const lessonLearned = sequelize('lessonLearned', {
      id: {
        type: sequelize.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      challenge: {
        type: sequelize.STRING
      },
      solution: {
        type: sequelize.STRING,
      },
      studyLinks: {
        type: sequelize.STRING,
      },
      projectId: {
        type: sequelize.STRING,
      }
  });

  lessonLearned.associate = function associateModels(models) {
    lessonLearned.belongsTo(models.project,  { foreignKey: 'id'});
  }
 
  return lessonLearned;
};