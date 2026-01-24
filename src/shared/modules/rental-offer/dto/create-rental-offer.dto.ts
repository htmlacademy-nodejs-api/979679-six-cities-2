import type { Coordinates, Facility, HousingType } from '../../../types/index.js';

export class CreateRentalOfferDto {
  title: string;
  description: string;
  city: string;
  preview: string;
  photos: string[];
  housingType: HousingType;
  roomCount: number;
  guestCount: number;
  cost: number;
  facilities: Facility[];
  coordinates: Coordinates;
  author: string;
}
