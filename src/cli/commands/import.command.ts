import type { Command } from './command.interface.js';
import { TsvFileReader } from '../../shared/lib/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage } from '../../shared/helpers/index.js';

export default class ImportCommand implements Command {

  private onImportedLine(line: string) {
    const offer = createOffer(line);
    console.info(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
  }

  async execute(...params: string[]): Promise<void> {
    const [filename] = params;
    const fileReader = new TsvFileReader(filename);
    fileReader.on('line', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      await fileReader.read();
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(error));
    }
  }

  getName(): string {
    return '--import';
  }

}
