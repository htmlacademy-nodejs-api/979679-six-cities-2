import type { HousingType } from './housing-type.enum.js';
import type { Facility } from './facility.enum.js';
import type { Coordinates } from './coordinates.type.js';
import type { User } from './user.interface.js';

export type MockServerData = {
  cities: string[];
  titles: string[];
  descriptions: string[];
  previews: string[];
  authors: User[];
  photos: string[];
  housingTypes: HousingType[];
  facilities: Array<Facility[]>;
  coordinates: Array<Coordinates>;
};
