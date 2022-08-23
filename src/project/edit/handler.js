import db from '../../../models';

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.name = "NotFoundError";
  }
}

/**
 * @name EditProject
 * @command serverless invoke local -f EditProject -p src/project/edit/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      project,
      projectSubject,
      projectTheme
    } = db;

    const getProject = await project.findByPk(eventBody.id);

    if(!getProject) throw new NotFoundError("Project not found.");

    await getProject.update(eventBody);

    if(eventBody.themes) {
      eventBody.themes.forEach(theme => {
        projectTheme.findOrCreate({
          where: {
            projectId: eventBody.id,
            themeId: theme
          }
        });
      });
    }

    if(eventBody.subjects) {
      eventBody.subjects.forEach(subject => {
        projectSubject.findOrCreate({
          where: {
            projectId: eventBody.id,
            subjectId: subject
          }
        });
      });
    }

    statusCode = 200;
    body.message = "Success to edit project";
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
          body.error = 'Error to edit project';
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