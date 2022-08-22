import db from '../../../models';
import { v4 as uuid } from 'uuid';

/**
 * @name CreateProject
 * @command serverless invoke local -f CreateProject -p src/project/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    eventBody.id = uuid();

    const {
      project,
      user
    } = db;

    const getUser = await user.findByPk(eventBody.userId);

    if(!getUser) throw new NotFoundError("User not found.")

    // ! ainda precisa aceitar cadastro com tema e materias

    const newProject = await project.create(eventBody);

    statusCode = 201;
    body.message = "Success to create new project";
    body.project = newProject.id;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to create new project';
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