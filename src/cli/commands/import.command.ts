import type { Command } from './command.interface.js';
import { TsvFileReader } from '../../shared/lib/tsv-file-reader.js';

export class ImportCommand implements Command {
  execute(...params: string[]): void {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename);
    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      console.error(`Details ${error.message}`);
    }
  }

  getName(): string {
    return '--import';
  }

}
