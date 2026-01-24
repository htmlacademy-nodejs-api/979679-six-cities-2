import { Container } from 'inversify';
import { RestApplication } from './rest.application.js';
import { Component } from '../shared/types/index.js';
import type { Logger } from '../shared/lib/logger/logger.interface.js';
import { PinoLogger } from '../shared/lib/logger/pino.logger.js';
import type { Config } from '../shared/lib/config/config.interface.js';
import type { RestSchema } from '../shared/lib/config/rest.schema.js';
import { RestConfig } from '../shared/lib/config/rest.config.js';
import type { DatabaseClient } from '../shared/lib/database-client/database-client.interface.js';
import { MongoDatabaseClient } from '../shared/lib/database-client/mongo.database-client.js';

export function createRestApplicationContainer() {
  const restApplicationContainer = new Container();

  restApplicationContainer.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  restApplicationContainer.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  restApplicationContainer.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  restApplicationContainer.bind<DatabaseClient>(Component.DatabaseClient).to(MongoDatabaseClient).inSingletonScope();

  return restApplicationContainer;
}
