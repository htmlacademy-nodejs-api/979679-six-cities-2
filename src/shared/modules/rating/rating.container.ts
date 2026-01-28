import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultRatingService } from './rating.service.js';
import type { RatingService } from './rating-service.interface.js';
import { types } from '@typegoose/typegoose';
import { type RatingEntity, RatingEntityModel } from './rating.entity.js';


export function createRatingContainer() {
  const ratingContainer = new Container();
  ratingContainer.bind<RatingService>(Component.FavoriteOfferService).to(DefaultRatingService).inSingletonScope();
  ratingContainer.bind<types.ModelType<RatingEntity>>(Component.RatingModel).toConstantValue(RatingEntityModel);
  return ratingContainer;
}
