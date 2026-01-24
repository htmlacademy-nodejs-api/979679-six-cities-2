import { CreateRentalOfferDto } from './dto/create-rental-offer.dto.js';
import type { DocumentType } from '@typegoose/typegoose';
import type { RentalOfferEntity } from './rental-offer.entity.js';

export interface RentalOfferService {
  create(dto: CreateRentalOfferDto): Promise<DocumentType<RentalOfferEntity>>
  update(id: string, dto: Partial<CreateRentalOfferDto>): Promise<DocumentType<RentalOfferEntity>>
  remove(id: string): Promise<void>
}
