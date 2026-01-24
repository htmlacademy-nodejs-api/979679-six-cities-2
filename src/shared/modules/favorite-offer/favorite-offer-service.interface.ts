import { UpdateFavoriteStatusDto } from './dto/update-favorite-status.dto.js';
import type { DocumentType } from '@typegoose/typegoose';
import { FavoriteOfferEntity } from './favorite-offer.entity.js';

export interface FavoriteOfferService {
  addFavorite(dto: UpdateFavoriteStatusDto): Promise<DocumentType<FavoriteOfferEntity>>;
  removeFavorite(id: string): Promise<void>;
}
