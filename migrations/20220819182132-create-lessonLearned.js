module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('lessonLearneds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      challenge: {
        type: Sequelize.STRING
      },
      solution: {
        type: Sequelize.STRING
      },
      studyLinks: {
        type: Sequelize.STRING
      },
      projectId: {
        type: Sequelize.STRING,
        references: {
          model: 'projects',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('lessonLearneds');
  }
};
