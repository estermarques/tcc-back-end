import db from '../../../models';

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.name = "NotFoundError";
  }
}

/**
 * @name CreateLessonLearned
 * @command serverless invoke local -f CreateLessonLearned -p src/lessonLearned/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      project,
      lessonLearned
    } = db;

    const getProject = await project.findByPk(eventBody.projectId);

    if(!getProject) throw new NotFoundError("Project not found.");

    const newLessonLearned = await lessonLearned.create(eventBody);

    statusCode = 201;
    body.message = "Success to create new lesson learned";
    body.lessonLearned = newLessonLearned.id;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to create new lesson learned';
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