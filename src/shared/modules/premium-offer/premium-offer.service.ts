import { inject, injectable } from 'inversify';
import type { PremiumOfferService } from './premium-offer-service.interface.js';
import { Component } from '../../types/index.js';
import type { Logger } from '../../lib/logger/logger.interface.js';
import { type DocumentType, types } from '@typegoose/typegoose';
import { PremiumOfferEntity } from './premium-offer.entity.js';
import { UpdatePremiumStatusDto } from './dto/update-premium-status.dto.js';

@injectable()
export class DefaultPremiumOfferService implements PremiumOfferService {
  constructor(@inject(Component.Logger) private readonly logger: Logger, @inject(Component.PremiumOfferModel) private readonly offerModel: types.ModelType<PremiumOfferEntity>) {
  }

  addPremium(dto: UpdatePremiumStatusDto): Promise<DocumentType<PremiumOfferEntity>> {
    const offer = this.offerModel.create(dto);
    this.logger.info(`Add new Premium: ${dto.offerId}`);
    return offer;
  }

  removePremium(id: string): Promise<void> {
    this.offerModel.findByIdAndDelete(id);
    this.logger.info(`Remove from Premium: ${id}`);
    return Promise.resolve();
  }

}
