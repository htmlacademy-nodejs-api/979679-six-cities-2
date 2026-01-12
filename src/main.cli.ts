#!/usr/bin/env node
import { CLIApplication } from './cli/index.js';
import type { Command } from './cli/commands/command.interface.js';
import { glob } from 'glob';
import { resolve } from 'node:path';

async function bootstrap() {
  const cliApplication = new CLIApplication();
  const importedCommands: Command[] = [];
  const files = glob.sync('src/cli/commands/*.command.ts');
  for (const file of files) {
    const modulePath = resolve(file);
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const {default: CommandClass} = await import(modulePath);
    if (typeof CommandClass === 'function') {
      importedCommands.push(new CommandClass());
    }
  }
  cliApplication.registerCommands(importedCommands);

  cliApplication.processCommand(process.argv);
}

bootstrap();
