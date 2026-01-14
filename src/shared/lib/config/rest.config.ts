import type { Config } from './config.interface.js';
import type { Logger } from '../logger/logger.interface.js';
import { config } from 'dotenv';
import { configRestSchema, type RestSchema } from './rest.schema.js';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;
  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const parsed = config();
    if (parsed.error) {
      throw new Error('Can\'t read .env file');
    }

    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file read succesfully');
  }

  get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
