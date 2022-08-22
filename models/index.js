const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const user = require('./user').default(sequelize, Sequelize);
const project = require('./project').default(sequelize, Sequelize);
const lessonLearned = require('./lessonLearned').default(sequelize, Sequelize);
const projectSubject = require('./projectSubject').default(sequelize, Sequelize);
const projectTheme = require('./projectTheme').default(sequelize, Sequelize);
const subject = require('./subject').default(sequelize, Sequelize);
const theme = require('./theme').default(sequelize, Sequelize);
const comment = require('./comment').default(sequelize, Sequelize);

const db = {
  user,
  project,
  lessonLearned,
  projectSubject,
  projectTheme,
  subject,
  theme,
  comment
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate  && db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;

