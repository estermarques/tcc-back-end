module.exports = (sequelize) => {
  const projectSubject = sequelize('projectSubject', {
    projectId: {
      type: sequelize.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    subjectId: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    }
  });

  projectSubject.associate = function associateModels(models) {
    projectSubject.belongsTo(models.subject, { foreignKey: 'subjectId'});
    projectSubject.belongsTo(models.project, { foreignKey: 'projectId'});
  }
 
  return projectSubject;
};