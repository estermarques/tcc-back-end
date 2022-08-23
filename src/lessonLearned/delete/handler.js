import db from '../../../models';

/**
 * @name DeleteLessonLearned
 * @command serverless invoke local -f DeleteLessonLearned -p src/lessonLearned/delete/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      lessonLearned
    } = db;

    await lessonLearned.destroy({ where: { id: eventBody.id }});

    statusCode = 200;
    body.message = "Success to delete lesson learned";

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to delete lesson learned';
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