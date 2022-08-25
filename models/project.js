export default (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      repositoryLink: {
        type: DataTypes.STRING,
      },
      stepsTaken: {
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

  project.associate = function associateModels(models) {
    project.belongsTo(models.user,  { foreignKey: 'userId'});
    project.belongsToMany(models.lessonLearned, { through: 'projectId' });
    project.belongsToMany(models.comment, { through: 'projectId' });

    project.hasMany(models.projectTheme, { foreignKey: 'projectId'});
    project.hasMany(models.projectSubject, { foreignKey: 'projectId'});
    project.hasMany(models.lessonLearned, { foreignKey: 'projectId'});
    project.hasMany(models.comment, { foreignKey: 'projectId'});
  };

  return project;
};