module.exports = (sequelize) => {
  const subject = sequelize('subject', {
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

  subject.associate = function associateModels(models) {
    subject.hasMany(models.projectSubject, { foreignKey: 'subjectId'});
  }
 
  return subject;
};