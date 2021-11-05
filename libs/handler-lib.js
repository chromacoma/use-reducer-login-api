import * as debug from './debug-lib';

export default function handler(lambda) {
  return function (event, context) {
    return (
      Promise.resolve()
        // Start debugger
        .then(() => debug.init(event, context))
        // Run the Lambda
        .then(() => lambda(event, context))
        // On success
        .then((responseBody) => [200, responseBody])
        // On failure
        .catch((error) => {
          // Print debug messages
          debug.flush(error);
          const { name, message } = error;
          const returnedError = message || name ? { name, message } : error;
          return [500, { status: false, error: returnedError }];
        })
        // Return HTTP response
        .then(([statusCode, body]) => ({
          statusCode,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
          body: JSON.stringify(body),
        }))
        // Cleanup debugger
        .finally(debug.end)
    );
  };
}
