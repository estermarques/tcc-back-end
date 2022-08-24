import db from '../../../models';

class NotFoundError {
  constructor(message) {
    this.message = message;
    this.name = "NotFoundError";
  }
}

/**
 * @name CreateComment
 * @command serverless invoke local -f CreateComment -p src/comment/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      project,
      user,
      comment
    } = db;

    const getUser = await user.findByPk(eventBody.userId);
    const getProject = await project.findByPk(eventBody.projectId);

    if(!getUser) throw new NotFoundError("User not found.");
    if(!getProject) throw new NotFoundError("Project not found.");

    const newComment = await comment.create(eventBody);

    statusCode = 201;
    body.message = "Success to create new comment";
    body.comment = newComment.id;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "NotFoundError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to create new comment';
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