import { createLogger, stdSerializers } from 'bunyan';
import { createStream } from 'bunyan-gcp-logging';

export const logger = createLogger({
  name: 'tracemark-core-token-handler',
  serializers: {
    ...stdSerializers,
  },
  /**
   * Level of logs from top to bottom:
   * fatal, error, warn, info, debug, trace
   *
   * @see https://github.com/trentm/node-bunyan#levels
   */
  streams: [
    process.env.NODE_ENV === 'development'
      ? {
          // Log level info and above to standard out
          stream: process.stdout,
          level: 'info',
        }
      : createStream(), // GCP-compatible stream in production
  ],
});
