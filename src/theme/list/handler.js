import db from '../../../models';

/**
 * @name ListThemes
 * @command serverless invoke local -f ListThemes
 */
export async function main(event) {
  const body = {};
  let statusCode;

  try {
    const {
      theme
    } = db;

    const themes = await theme.findAll();

    statusCode = 200;
    body.message = "Success to list themes";
    body.themes = themes;

  } catch (error) {
    console.log(error);
    statusCode = 500;
    body.error = 'Error to find themes';
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