
import 'reflect-metadata';
import { Container } from 'inversify';
import { PinoLogger } from './shared/lib/logger/pino.logger.js';
import { RestApplication } from './rest/rest.application.js';
import { RestConfig } from './shared/lib/config/rest.config.js';
import { Component } from './shared/types/index.js';
import type { Logger } from './shared/lib/logger/logger.interface.js';
import type { Config } from './shared/lib/config/config.interface.js';
import type { RestSchema } from './shared/lib/config/rest.schema.js';

async function bootstrap() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<Logger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<Config<RestSchema>>(Component.Config).to(RestConfig).inSingletonScope();
  const application = container.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
