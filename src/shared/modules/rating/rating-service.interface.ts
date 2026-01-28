import { OfferRating } from './dto/offer-rating.dto.js';
import type { DocumentType } from '@typegoose/typegoose';
import { RatingEntity } from './rating.entity.js';

export interface RatingService {
  createOrUpdate(dto: OfferRating): Promise<DocumentType<RatingEntity>>;
}

