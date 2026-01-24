import 'reflect-metadata';
import { Container } from 'inversify';
import { createRestApplicationContainer } from './rest/rest.container.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { Component } from './shared/types/index.js';
import type { RestApplication } from './rest/rest.application.js';
import { createPremiumOfferContainer } from './shared/modules/premium-offer/index.js';
import { createFavoriteOfferContainer } from './shared/modules/favorite-offer/index.js';
import { createRatingContainer } from './shared/modules/rating/index.js';
import { createRentalOfferContainer } from './shared/modules/rental-offer/index.js';

async function bootstrap() {
  const appContainer = Container.merge(createRestApplicationContainer(), createUserContainer(), createPremiumOfferContainer(), createFavoriteOfferContainer(), createRatingContainer(), createRentalOfferContainer());
  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
