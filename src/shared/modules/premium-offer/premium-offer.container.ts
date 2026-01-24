import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { DefaultPremiumOfferService } from './premium-offer.service.js';
import type { PremiumOfferService } from './premium-offer-service.interface.js';
import { types } from '@typegoose/typegoose';
import { type PremiumOfferEntity, PremiumOfferModel } from './premium-offer.entity.js';


export function createPremiumOfferContainer() {
  const premiumOfferContainer = new Container();
  premiumOfferContainer.bind<PremiumOfferService>(Component.PremiumOfferService).to(DefaultPremiumOfferService).inSingletonScope();
  premiumOfferContainer.bind<types.ModelType<PremiumOfferEntity>>(Component.PremiumOfferModel).toConstantValue(PremiumOfferModel);
  return premiumOfferContainer;
}
