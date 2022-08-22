import db from '../../../models';

/**
 * @name ListSubjects
 * @command serverless invoke local -f ListSubjects
 */
export async function main(event) {
  const body = {};
  let statusCode;

  try {
    const {
      subject
    } = db;

    const subjects = await subject.findAll();

    statusCode = 200;
    body.message = "Success to list subjects";
    body.subjects = subjects;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to find subjects';
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