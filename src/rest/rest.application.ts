import type { Logger } from '../shared/lib/logger/logger.interface.js';
import type { RestSchema } from '../shared/lib/config/rest.schema.js';
import type { Config } from '../shared/lib/config/config.interface.js';
import { inject, injectable } from 'inversify';
import { Component } from '../shared/types/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value form env $PORT: ${this.config.get('PORT')}`);
  }
}
