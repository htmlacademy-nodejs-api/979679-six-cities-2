import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import type { Logger } from '../../lib/logger/logger.interface.js';
import { type DocumentType, types } from '@typegoose/typegoose';
import type { RentalOfferService } from './rental-offer-service.interface.js';
import type { CreateRentalOfferDto, RentalOfferEntity } from './index.js';

@injectable()
export class DefaultRentalOfferService implements RentalOfferService {
  constructor(@inject(Component.Logger) private readonly logger: Logger, @inject(Component.RentalOfferModel) private readonly rentalOfferModel: types.ModelType<RentalOfferEntity>) {
  }

  public async create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>> {
    const offer = await this.rentalOfferModel.create(dto);
    this.logger.info(`New rental offer created: ${dto.title}`);
    return offer;
  }

  public async update(id: string, dto: Partial<CreateRentalOfferDto>): Promise<DocumentType<RentalOfferEntity>> {
    const offer = await this.rentalOfferModel.findById({id});
    if (!offer) {
      throw new Error(`${id} not found`);
    }
    offer.set(dto);
    await offer.save();
    this.logger.info(`Rental offer updated: ${dto.title}`);
    return offer;
  }

  public async remove(id: string): Promise<void> {
    await this.rentalOfferModel.findByIdAndDelete(id);
    this.logger.info(`Rental offer deleted: ${id}`);
  }
}
