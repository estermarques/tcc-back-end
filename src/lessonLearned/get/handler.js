import db from '../../../models';

/**
 * @name ListLessonsLearned
 * @command serverless invoke local -f ListLessonsLearned -p src/lessonLearned/list/mock.json
 */
export async function main(event) {
  const { projectId, id } = event.queryStringParameters;
  const body = {};
  let statusCode;

  try {
    const {
      lessonLearned
    } = db;

    let lessonsLearned;

    if (projectId && projectId !== '') {
      lessonsLearned = await lessonLearned.findByPk(id);
    } else {
      lessonsLearned = await lessonLearned.findAll({
        where: {
          projectId
        }
      });
    }

    statusCode = 200;
    body.message = "Success to list lessons learned";
    body.lessonsLearned = lessonsLearned;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to find lessons learned';
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