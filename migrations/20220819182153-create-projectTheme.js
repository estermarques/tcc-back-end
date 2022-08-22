module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('projectThemes', {
      projectId: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'projects',
          key: 'id',
        },
      },
      themeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references: {
          model: 'themes',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('projectThemes');
  }
};
