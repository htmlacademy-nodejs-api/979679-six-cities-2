import type { Facility, HousingType, User } from '../types/index.js';

export function createOffer(offerData: string) {
  const [title, description, postDate, city, preview, photos, , , rating, housingType, roomCount, guestCount, cost, facilities, author, commentCounts, latitude, longitude] = offerData.replace('\n', '').split('\t');
  return {
    title,
    description,
    postDate: new Date(postDate),
    city,
    preview,
    photos: photos.split(','),
    rating: Number.parseFloat(rating),
    housingType: housingType as HousingType,
    roomCount: Number.parseInt(roomCount, 10),
    guestCount: Number.parseInt(guestCount, 10),
    cost: Number.parseInt(cost, 10),
    facilities: facilities.split(',') as Facility[],
    author: JSON.parse(author) as unknown as User,
    commentCounts: commentCounts ? Number.parseInt(commentCounts, 10) : 0,
    coordinates: {
      longitude,
      latitude
    }
  };
}
