import db from '../../../models';

function ExistingObjectError(message) {
  this.message = message;
  this.name = "ExistingObjectError";
}

/**
 * @name CreateTheme
 * @command serverless invoke local -f CreateTheme -p src/theme/create/mock.json
 */
export async function main(event) {
  const eventBody = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  const body = {};
  let statusCode;

  try {
    const {
      theme
    } = db;

    const getTheme = await theme.findAll({
      where: { title: eventBody.title }
    });

    if(!getTheme) throw new ExistingObjectError("This theme already exists.");

    const newTheme = await theme.create(eventBody);

    statusCode = 201;
    body.message = "Success to create new theme";
    body.theme = newTheme.id;

  } catch (error) {
    console.log(error);

    switch(error.name) {
        case "ExistingObjectError":
          statusCode = 404;
          body.error = error.message;
          break;
        default:
          statusCode = 500;
          body.error = 'Error to create new theme';
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