import { resolve } from 'node:path';
import type { Command } from './command.interface.js';
import { readFileSync } from 'node:fs';
import chalk from 'chalk';

interface PackageJsonData {
  version: string
}


export default class VersionCommand implements Command {
  constructor(private readonly filepath: string = './package.json') {
  }

  private readVersion(): string {
    const json = readFileSync(resolve(this.filepath), 'utf-8');
    const parsedData: unknown = JSON.parse(json);

    if (!this.isPackageJson(parsedData)) {
      throw new Error('Invalid package.json');
    }

    return parsedData.version;
  }

  private isPackageJson(value: unknown): value is PackageJsonData {
    return value !== null && typeof value === 'object' && !Array.isArray(value) && Object.hasOwn(value, 'version');
  }

  execute(..._params: string[]): void {
    try {
      const ver = this.readVersion();
      console.log(chalk.green(ver));
    } catch (e) {
      console.error(`Failed to read version from ${this.filepath}`);
      if (e instanceof Error) {
        console.error(chalk.bgRed(e.message));
      }
    }
  }

  getName(): string {
    return '--version';
  }
}
