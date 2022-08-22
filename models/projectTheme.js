export default (sequelize, DataTypes) => {
  const projectTheme = sequelize.define('projectTheme', {
    projectId: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    themeId: {
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

  projectTheme.associate = function associateModels(models) {
    projectTheme.belongsTo(models.theme, { foreignKey: 'themeId'});
    projectTheme.belongsTo(models.project, { foreignKey: 'projectId'});
  };

  return projectTheme;
};