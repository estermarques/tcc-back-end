module.exports = (sequelize) => {
  const project = sequelize('project', {
      id: {
        type: sequelize.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: sequelize.STRING,
      },
      repositoryLink: {
        type: sequelize.STRING,
      },
      stepsTaken: {
        type: sequelize.STRING,
      },
      userId: {
        type: sequelize.STRING,
      }
      }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false,
      }
  );

  project.associate = function associateModels(models) {
    project.belongsTo(models.user,  { foreignKey: 'id'});
    project.belongsToMany(models.lessonLearned, { through: 'projectId' });
    project.belongsToMany(models.comment, { through: 'projectId' });

    project.hasMany(models.projectTheme, { foreignKey: 'projectId'});
    project.hasMany(models.projectSubject, { foreignKey: 'projectId'});
    project.hasMany(models.lessonLearned, { foreignKey: 'projectId'});
    project.hasMany(models.comment, { foreignKey: 'projectId'});
  }
 
  return project;
};