# create-functions-ts

Quickly scaffold Cloud Functions project, with TypeScript and Bunyan logger support by running the command below.

```bash
npx degit muazamkamal/create-functions-ts my-function && cd my-function
npm install
npm run start:dev
npm run deploy # Requires gcloud CLI installed
```

Refer to [this guide](https://cloud.google.com/functions/docs/running/calling) on how to trigger the function locally during development.

## Post-install

Ensure to replace all the default name and values at these following location, right after scaffolding.

| Name                       | File                         | Description                                                                                                                             |
| -------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `function`                 | Line 2: `/package.json`      | Node package name.                                                                                                                      |
| `functionEntry`            | Line 14: `/package.json`     | Function name for execution entry point, must match name in `index.ts` and `deploy.sh`. Refer to the next section for more details.     |
| `functionEntry`            | Line 3: `/src/index.ts`      | Function name for execution entry point, must match name in `package.json` and `deploy.sh`. Refer to the next section for more details. |
| `functionEntry`            | Line 4: `/scripts/deploy.sh` | Function name for execution entry point, must match name in `index.ts` and `package.json`. Refer to the next section for more details.  |
| \*                         | `/.env.example`              | Environment variable example file. Create `.env` file with variables needed.                                                            |
| `USERNAME=username:latest` | Line 8: `scripts/deploy.sh`  | Binding for secrets from Google Secret Manager to environment variables. [ENV_VAR]=[secret-name:version]                                |

### Function name & type

Function name must match in these three files (`/package.json`, `/src/index.ts`, `/scripts/deploy.sh`).

For background function (pub/sub), refer below.

Replace `index.ts` with code below.

```ts
import "dotenv/config";
import type { EventFunction } from "@google-cloud/functions-framework/build/src/functions";
import { logger } from "./functions";

export const functionEntry: EventFunction = async (message, _context) => {
  logger.info({ message }, `Received message`);

  return;
};
```

Replace the start script in `package.json` with snippet below

```json
{
  "start": "functions-framework --source=dist/src/ --target=functionEntry --signature-type=event | bunyan -L -o short"
}
```

Replace the deploy `--trigger-http` flag in `deploy.sh` with `--trigger-topic pubsub-topic`.

## Environment Variables

Environment variables can be set in `/.env`, by using `/.env.example` as a template. Variables are then accessible through `process.env`.

```ts
import "dotenv/config";

const usernameEnv = process.env.USERNAME;
```

In a deployed environment, environment variables can be set by binding the secrets from Secret Manager as a environment variables. The binding is done when deploying the function, refer to the `--set-secrets` flag in the `deploy.sh` script.

## TODO

- Post-install CLI script to automate all the replacements and ability to choose function type.
