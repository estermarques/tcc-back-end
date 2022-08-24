import db from '../../../models';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.js')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * @name DeleteProject
 * @command serverless invoke local -f DeleteProject -p src/project/delete/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  const t = await sequelize.transaction();
  let statusCode;

  try {
    const {
      lessonLearned,
      projectSubject,
      projectTheme,
      project,
      comment,
    } = db;

    await lessonLearned.destroy({where: { projectId: eventBody.id }}, { transaction: t });
    await projectSubject.destroy({ where: { projectId: eventBody.id }}, { transaction: t });
    await projectTheme.destroy({ where: { projectId: eventBody.id }}, { transaction: t });
    await comment.destroy({ where: { projectId: eventBody.id }}, { transaction: t });
    await project.destroy({ where: { id: eventBody.id }}, { transaction: t });

    await t.commit();

    statusCode = 200;
    body.message = "Success to delete project";

  } catch (error) {
    await t.rollback();
    console.log(error);
    statusCode = 500;
    body.error = 'Error to delete project';
  }

  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': 'X-Amz-Security-Token',
    }
  };
}