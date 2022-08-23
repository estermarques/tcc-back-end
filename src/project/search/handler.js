import db from '../../../models';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../../config/config.js')[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

/**
 * @name SearchProject
 * @command serverless invoke local -f SearchProject -p src/project/search/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      project,
      user,
      projectSubject,
      projectTheme
    } = db;

    const getProjects = await project.findAll({
      where: sequelize.or({
          title: {
            like: eventBody.title,
          }
        },
        {
          subjectId: eventBody.subject,
        },
        {
          themeId: eventBody.theme,
        },
        {
          name: {
            like: eventBody.author
          }
        }
      ),
      include: [
        {model: projectSubject},
        {model: projectTheme},
        {model: user}
      ]
    });

    statusCode = 201;
    body.message = "Success to search projects";
    body.projects = getProjects;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to search projects';
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