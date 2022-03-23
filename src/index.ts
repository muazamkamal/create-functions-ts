import type { HttpFunction } from "@google-cloud/functions-framework/build/src/functions";
import { logger } from "./functions";

export const functionEntry: HttpFunction = (_request, response) => {
  logger.info("Hello World!");
  return response.json({ message: "Hello world!" });
};
