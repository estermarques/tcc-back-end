import db from '../../../models';

function ExistingSubjectError(message) {
  this.message = message;
  this.name = "ExistingSubjectError";
}

/**
 * @name CreateSubject
 * @command serverless invoke local -f CreateSubject -p src/subject/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      subject
    } = db;

    const getSubject = await subject.findAll({
      where: { title: eventBody.title }
    });

    if(!getSubject) throw new ExistingSubjectError("This subject already exists.");

    const newSubject = await subject.create(eventBody);

    statusCode = 201;
    body.message = "Success to create new subject";
    body.subject = newSubject.id;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "ExistingSubjectError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to create new subject';
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