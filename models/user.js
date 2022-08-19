module.exports = (sequelize) => {
  const user = sequelize('user', {
    id: {
      type: sequelize.STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
    },
    name: {
      type: sequelize.STRING,
    },
    isProfessor: {
      type: sequelize.BOOLEAN,
    },
  });

  user.associate = function associateModels(models) {
    user.belongsToMany(models.project, { through: 'userId' });
    user.belongsToMany(models.comment, { through: 'userId' });
    user.hasMany(models.project);
    user.hasMany(models.comment);
  }
 
  return user;
};