import 'reflect-metadata';

import { Backend } from './backend';
import { HealthController } from './controllers/health.controller';
import { RepositoryController } from './controllers/repository.controller';

const controllers = [HealthController, RepositoryController];

/**
 * Start the app
 */
export async function startApp() {
  return Backend.create(controllers, []);
}

if (process.env.NODE_ENV !== 'test') {
  void (async function () {
    try {
      const be = await startApp();

      await be.start();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      process.exit(-1);
    }
  })();
}
