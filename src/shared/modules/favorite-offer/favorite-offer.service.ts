import { inject, injectable } from 'inversify';
import type { FavoriteOfferService } from './favorite-offer-service.interface.js';
import { Component } from '../../types/index.js';
import type { Logger } from '../../lib/logger/logger.interface.js';
import { type DocumentType, types } from '@typegoose/typegoose';
import { FavoriteOfferEntity } from './favorite-offer.entity.js';
import { UpdateFavoriteStatusDto } from './dto/update-favorite-status.dto.js';

@injectable()
export class DefaultFavoriteOfferService implements FavoriteOfferService {
  constructor(@inject(Component.Logger) private readonly logger: Logger, @inject(Component.FavoriteOfferModel) private readonly offerModel: types.ModelType<FavoriteOfferEntity>) {
  }

  addFavorite(dto: UpdateFavoriteStatusDto): Promise<DocumentType<FavoriteOfferEntity>> {
    const offer = this.offerModel.create(dto);
    this.logger.info(`Add new favorite: ${dto.offerId}`);
    return offer;
  }

  removeFavorite(id: string): Promise<void> {
    this.offerModel.findByIdAndDelete(id);
    this.logger.info(`Remove from favorite: ${id}`);
    return Promise.resolve();
  }

}
