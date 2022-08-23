import db from '../../../models';

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.name = "NotFoundError";
  }
}

/**
 * @name EditLessonLearned
 * @command serverless invoke local -f EditLessonLearned -p src/lessonLearned/edit/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      lessonLearned
    } = db;

    const getLessonLearned = await lessonLearned.findByPk(eventBody.id);

    if(!getLessonLearned) throw new NotFoundError("Lesson Learned not found.");

    await getLessonLearned.update(eventBody);

    statusCode = 200;
    body.message = "Success to edit lesson learned";
    body.lessonLearned = getLessonLearned;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to edit lesson learned';
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