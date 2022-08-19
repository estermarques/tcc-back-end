module.exports = (sequelize) => {
  const projectTheme = sequelize('projectTheme', {
    projectId: {
      type: sequelize.STRING,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    },
    themeId: {
      type: sequelize.INTEGER,
      allowNull: false,
      autoIncrement: false,
      primaryKey: true
    }
  });

  projectTheme.associate = function associateModels(models) {
    projectTheme.belongsTo(models.theme, { foreignKey: 'themeId'});
    projectTheme.belongsTo(models.project, { foreignKey: 'projectId'});
  }
 
  return projectTheme;
};