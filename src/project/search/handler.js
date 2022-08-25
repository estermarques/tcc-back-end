import db from '../../../models';

const { Op } = require('sequelize');

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

    let include = [];

    if(eventBody.theme && eventBody.theme !== 0) {
      include.push({
        model: projectTheme,
        where: { themeId: eventBody.theme }
      });
    }

    if(eventBody.subject && eventBody.subject !== 0) {
      include.push({
        model: projectSubject,
        where: { subjectId: eventBody.subject }
      });
    }

    if(eventBody.author && eventBody.author !== '') {
      include.push({
        model: user,
        attributes: ['name'],
        where: {
          name: {
            [Op.like]: `%${eventBody.author}%`
          }
        }
      });
    }

    const getProjects = await project.findAll({
      attributes: ['id', 'title', 'description'],
      where: {
        title: {
          [Op.like]: `%${eventBody.title}%`,
        }
      },
      include: include
    });

    console.log(getProjects);

    statusCode = 200;
    body.message = "Success to search projects";
    body.projects = getProjects;
    body.numberOfProjects = getProjects.length;

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