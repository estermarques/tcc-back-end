import db from '../../../models';

/**
 * @name ListComments
 * @command serverless invoke local -f ListComments -p src/comment/list/mock.json
 */
export async function main(event) {
  const { projectId } = event.pathParameters;
  const body = {};
  let statusCode;

  try {
    const {
      comment
    } = db;

    const comments = await comment.findAll({
      where: {
        projectId: projectId
      }
    });

    statusCode = 200;
    body.message = "Success to list comments";
    body.comments = comments;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to find comments';
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