import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultRentalOfferService } from './rental-offer.service.js';
import { types } from '@typegoose/typegoose';
import { RentalOfferEntity, RentalOfferModel } from './rental-offer.entity.js';
import type { RentalOfferService } from './rental-offer-service.interface.js';


export function createRentalOfferContainer() {
  const ratingContainer = new Container();
  ratingContainer.bind<RentalOfferService>(Component.RentalOfferService).to(DefaultRentalOfferService).inSingletonScope();
  ratingContainer.bind<types.ModelType<RentalOfferEntity>>(Component.RentalOfferModel).toConstantValue(RentalOfferModel);
  return ratingContainer;
}
