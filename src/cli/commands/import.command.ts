import type { Command } from './command.interface.js';
import { TsvFileReader } from '../../shared/lib/file-reader/tsv-file-reader.js';
import { createOffer, getErrorMessage, getMongoURI } from '../../shared/helpers/index.js';
import type { Logger } from '../../shared/lib/logger/logger.interface.js';
import type { UserService } from '../../shared/modules/user/user-service.interface.js';
import type { DatabaseClient } from '../../shared/lib/database-client/database-client.interface.js';
import {
  DefaultRentalOfferService,
  RentalOfferModel,
  type RentalOfferService
} from '../../shared/modules/rental-offer/index.js';
import { ConsoleLogger } from '../../shared/lib/logger/console.logger.js';
import { DefaultUserService, UserModel } from '../../shared/modules/user/index.js';
import { MongoDatabaseClient } from '../../shared/lib/database-client/mongo.database-client.js';
import { DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from './command.constant.js';
import { type RentalOffer, UserType } from '../../shared/types/index.js';

export class ImportCommand implements Command {

  private userService: UserService;
  private offerService: RentalOfferService;
  private databaseClient: DatabaseClient;
  private logger: Logger;
  private salt: string;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    this.logger = new ConsoleLogger();
    this.offerService = new DefaultRentalOfferService(this.logger, RentalOfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  private async onImportedLine(line: string) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
  }

  private onCompleteImport(count: number) {
    console.info(`${count} rows imported.`);
    this.databaseClient?.disconnect();
  }

  private async saveOffer(offer: Omit<RentalOffer, 'isPremium' | 'isFavorite' | 'rating'>) {
    // это все нужно в TSV тоже упихать?

    const user = await this.userService.create({
      avatar: offer.author,
      userType: UserType.COMMON,
      name: 'generate name',
      email: 'email',
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      author: user.id,
    });

  }

  async execute(filename: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    await this.databaseClient.connect(uri);
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
