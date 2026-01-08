import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';
import { RentalOffer } from '../types/rental-offer.interface.js';
import { HousingType } from '../types/housing-type.enum.js';
import { Facility } from '../types/facility.enum.js';

export class TsvFileReader implements FileReader {
  private rawData = '';

  constructor(private readonly filename: string) {
  }

  read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf8'});
  }

  public toArray(): RentalOffer[] {
    if (!this.rawData) {
      throw new Error('No data to read');
    }
    return this.rawData.split('\n').filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, postDate, city, preview, photos, isPremium, isFavorite, rating, housingType, roomCount, guestCount, cost, facilities, author, commentCounts, latitude, longitude]) => ({
        title,
        description,
        postDate: new Date(postDate),
        city,
        preview,
        photos: photos.split(';'),
        isPremium: Boolean(isPremium),
        isFavorite: Boolean(isFavorite),
        rating: Number.parseFloat(rating),
        housingType: housingType as HousingType,
        roomCount: Number.parseInt(roomCount, 10),
        guestCount: Number.parseInt(guestCount, 10),
        cost: Number.parseInt(cost, 10),
        facilities: facilities.split(';') as Facility[],
        author,
        commentCounts: commentCounts ? Number.parseInt(commentCounts, 10) : 0,
        coordinates: {
          longitude,
          latitude
        }
      }));
  }
}
