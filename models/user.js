export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: {
      type: DataTypes.STRING,
      autoIncrement: false,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
    isProfessor: {
      type: DataTypes.BOOLEAN,
    },
    }, {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );

  user.associate = function associateModels(models) {
    user.belongsToMany(models.project, { through: 'userId' });
    user.belongsToMany(models.comment, { through: 'userId' });
    user.hasMany(models.project);
    user.hasMany(models.comment);
  };

  return user;
};