import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultFavoriteOfferService } from './favorite-offer.service.js';
import type { FavoriteOfferService } from './favorite-offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { type FavoriteOfferEntity, FavoriteOfferModel } from './favorite-offer.entity.js';


export function createFavoriteOfferContainer() {
  const favoriteOfferContainer = new Container();
  favoriteOfferContainer.bind<FavoriteOfferService>(Component.FavoriteOfferService).to(DefaultFavoriteOfferService).inSingletonScope();
  favoriteOfferContainer.bind<types.ModelType<FavoriteOfferEntity>>(Component.FavoriteOfferModel).toConstantValue(FavoriteOfferModel);
  return favoriteOfferContainer;
}
