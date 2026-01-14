import type { Command } from './command.interface.js';
import type { MockServerData } from '../../shared/types/index.js';
import got from 'got';
import { TsvOfferGenerator } from '../../shared/lib/offer-generator/tsv-offer-generator.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { TsvFileWriter } from '../../shared/lib/file-writer/tsv-file-writer.js';

export class GenerateCommand implements Command {

  private initialData: MockServerData | undefined;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    if (!this.initialData) {
      return;
    }
    const tsvOfferGenerator = new TsvOfferGenerator(this.initialData);
    const tsvFileWriter = new TsvFileWriter(filepath);
    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(tsvOfferGenerator.generate());
    }
  }

  getName(): string {
    return '--generate';
  }

  async execute(...params: string[]): Promise<void> {
    const [count, filepath, url] = params;
    const offerCount = Number.parseInt(count, 10);
    try {
      await this.load(url);
      await this.write(filepath, offerCount);
      console.info(`File ${filepath} was created!`);
    } catch (error) {
      console.error('Can\'t generate date');
      console.error(getErrorMessage(error));
    }
  }
}
