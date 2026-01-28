import type { DocumentType } from '@typegoose/typegoose';
import { PremiumOfferEntity } from './premium-offer.entity.js';
import { UpdatePremiumStatusDto } from './dto/update-premium-status.dto.js';

export interface PremiumOfferService {
  addPremium(dto: UpdatePremiumStatusDto): Promise<DocumentType<PremiumOfferEntity>>;
  removePremium(id: string): Promise<void>;
}
