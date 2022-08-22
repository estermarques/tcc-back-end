export default (sequelize, DataTypes) => {
  const subject = sequelize.define('subject', {
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

  subject.associate = function associateModels(models) {
    subject.hasMany(models.projectSubject, { foreignKey: 'subjectId'});
  };

  return subject;
};