import db from '../../../models';

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.name = "NotFoundError";
  }
}

/**
 * @name GetProject
 * @command serverless invoke local -f GetProject -p src/project/get/mock.json
 */
export async function main(event) {
  const { projectId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {
    const {
      project
    } = db;

    //! retornar lições aprendidas, temas e materias tbm
    const getProject = await project.findByPk(projectId);

    if(!getProject) throw new NotFoundError("Project not found.");

    statusCode = 200;
    body.message = "Success to get project";
    body.project = getProject;

  } catch (error) {
    console.log(error);

    switch(error.name) {
      case "NotFoundError":
        statusCode = 404;
        body.error = error.message;
        break;
      default:
        statusCode = 500;
        body.error = 'Error to get project';
    }
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