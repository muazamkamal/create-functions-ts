import type {HttpFunction} from '@google-cloud/functions-framework/build/src/functions';

export const functionEntry: HttpFunction = (_request, response) => {
  return response.json({message: 'Hello world!'});
};
