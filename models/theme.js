module.exports = (sequelize) => {
  const theme = sequelize('theme', {
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: sequelize.STRING
    }
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
);

  theme.associate = function associateModels(models) {
    theme.hasMany(models.projectTheme, { foreignKey: 'themeId'});
  }
 
  return theme;
};