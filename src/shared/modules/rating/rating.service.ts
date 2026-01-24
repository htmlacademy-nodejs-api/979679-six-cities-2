import { inject, injectable } from 'inversify';
import type { RatingService } from './rating-service.interface.js';
import { Component } from '../../types/index.js';
import type { Logger } from '../../lib/logger/logger.interface.js';
import { type DocumentType, types } from '@typegoose/typegoose';
import { RatingEntity } from './rating.entity.js';
import { OfferRating } from './dto/offer-rating.dto.js';

@injectable()
export class DefaultRatingService implements RatingService {
  constructor(@inject(Component.Logger) private readonly logger: Logger, @inject(Component.RatingModel) private readonly ratingModel: types.ModelType<RatingEntity>) {
  }

  async createOrUpdate(dto: OfferRating): Promise<DocumentType<RatingEntity>> {
    const offer = await this.ratingModel.findOne({userId: dto.userId, offerId: dto.offerId});
    if (!offer) {
      const newOffer = this.ratingModel.create(dto);
      this.logger.info(`Create rating favorite: ${dto.offerId}`);
      return newOffer;
    }
    offer.set(dto);
    await offer.save();

    this.logger.info(`Update rating: ${dto.offerId}`);
    return offer;
  }
}
