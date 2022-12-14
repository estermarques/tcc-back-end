import db from '../../../models';

const { Op } = require('sequelize');

/**
 * @name SearchProject
 * @command serverless invoke local -f SearchProject -p src/project/search/mock.json
 */
export async function main(event) {
  const { subject, author, title, userId } = event.queryStringParameters;
  const body = {};
  let statusCode;

  try {
    const {
      project,
      user,
      projectSubject,
    } = db;

    let getProjects = [];

    if (userId && userId !== '') {
      getProjects = await project.findAll({
        attributes: ['id', 'title', 'description'],
        include: {
          model: user,
          attributes: ['name']
        }
      });
    } else {
      let include = [];

      if(subject && subject !== 0) {
        include.push({
          model: projectSubject,
          where: { subjectId: subject }
        });
      }

      if(author && author !== '') {
        include.push({
          model: user,
          attributes: ['name'],
          where: {
            name: {
              [Op.like]: `%${author}%`
            }
          }
        });
      }

      //! so esta listando quando manda algo no titulo, mesmo que seja vazio
      getProjects = await project.findAll({
        attributes: ['id', 'title', 'description'],
        where: {
          title: {
            [Op.like]: `%${title}%`,
          }
        },
        include: include
      });
    }

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