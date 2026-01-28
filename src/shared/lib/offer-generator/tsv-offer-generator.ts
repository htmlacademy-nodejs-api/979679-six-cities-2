import type { OfferGenerator } from './offer-generator.interface.js';
import type { MockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/index.js';
import dayjs from 'dayjs';

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TsvOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {
  }

  generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day')
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const preview = getRandomItem(this.mockData.previews);
    const photos = getRandomItems(this.mockData.photos);
    const isPremium = !!generateRandomValue(0, 1);
    const isFavorite = !!generateRandomValue(0, 1);
    const rating = generateRandomValue(0, 5, 1);
    const housingType = getRandomItem(this.mockData.housingTypes);
    const roomCount = generateRandomValue(1, 8);
    const guestCount = generateRandomValue(1, 10);
    const cost = generateRandomValue(100, 100000);
    const facilities = getRandomItem(this.mockData.facilities);
    const author = JSON.stringify(getRandomItem(this.mockData.authors));
    const commentsCount = generateRandomValue(0, 40);
    const {longitude, latitude} = getRandomItem(this.mockData.coordinates);
    return [
      title, description, postDate, city,
      preview, photos, isPremium, isFavorite,
      rating, housingType, roomCount, guestCount,
      cost, facilities, author, commentsCount, latitude, longitude
    ].join('\t');
  }
}
