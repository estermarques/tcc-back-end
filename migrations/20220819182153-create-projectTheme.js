module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projectTheme', {
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
          model: 'theme',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projectTheme');
  }
};
