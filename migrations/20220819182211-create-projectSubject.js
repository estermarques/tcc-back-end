module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projectSubject', {
      projectId: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'project',
          key: 'id',
        },
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'subject',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projectSubject');
  }
};
