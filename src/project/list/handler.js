import db from '../../../models';

/**
 * @name ListProjects
 * @command serverless invoke local -f ListProjects
 */
export async function main() {
  const body = {};
  let statusCode;

  try {
    const {
      project
    } = db;

    const projects = await project.findAll();

    statusCode = 200;
    body.message = "Success to list projects";
    body.projects = projects;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to find projects';
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