export default (sequelize, DataTypes) => {
  const theme = sequelize.define('theme', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING
    }
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
);

  theme.associate = function associateModels(models) {
    theme.hasMany(models.projectTheme, { foreignKey: 'themeId'});
  };

  return theme;
};