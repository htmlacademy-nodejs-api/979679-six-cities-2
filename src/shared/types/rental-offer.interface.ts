import type { HousingType } from './housing-type.enum.js';
import type { Facility } from './facility.enum.js';
import type { Coordinates } from './coordinates.type.js';
import type { User } from './user.interface.js';

export interface RentalOffer {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  preview: string;
  photos: string[];
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  cost: number;
  facilities: Facility[];
  author: User;
  commentCounts?: number;
  coordinates: Coordinates;
  isPremium: boolean;
  isFavorite: boolean;
}
