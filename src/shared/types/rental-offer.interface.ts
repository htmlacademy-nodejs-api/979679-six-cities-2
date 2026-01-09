import type { HousingType } from './housing-type.enum.js';
import type { Facility } from './facility.enum.js';
import type { Coordinates } from './coordinates.type.js';

export interface RentalOffer {
  title: string;
  description: string;
  postDate: Date;
  city: string;
  preview: string;
  photos: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  cost: number;
  facilities: Facility[];
  author: string;
  commentCounts?: number;
  coordinates: Coordinates;
}
