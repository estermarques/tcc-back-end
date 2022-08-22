export default (sequelize, DataTypes) => {
  const projectSubject = sequelize.define('projectSubject', {
    projectId: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    subjectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    }
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
);

  projectSubject.associate = function associateModels(models) {
    projectSubject.belongsTo(models.subject, { foreignKey: 'subjectId'});
    projectSubject.belongsTo(models.project, { foreignKey: 'projectId'});
  };

  return projectSubject;
};