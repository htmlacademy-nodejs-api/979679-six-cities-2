import { defaultClasses, getModelForClass, modelOptions, prop, type Ref } from '@typegoose/typegoose';
import { type Coordinates, Facility, HousingType } from '../../types/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RentalOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rental-offer',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RentalOfferEntity extends defaultClasses.TimeStamps {

  @prop({ trim: true, required: true, minlength: 10, maxlength: 100 })
  public title: string;

  @prop({ trim: true, required: true, minlength: 20, maxlength: 1024 })
  public description: string;

  @prop({ required: true })
  public postDate: Date;

  @prop({ required: true })
  public preview: string;

  @prop({ required: true, default: [] })
  public photos: string[];

  @prop({ required: true, ref: UserEntity })
  public author: Ref<UserEntity>;

  @prop({ required: true })
  public city: string;

  @prop({default: 0})
  public commentCounts: number;

  @prop({default: null})
  public coordinates: Coordinates | null;

  @prop({ required: true, min: 100, max: 100_000 })
  public cost: number;

  @prop({ required: true, default:[] })
  public facilities: Facility[];

  @prop({ required: true, min: 1, max: 10 })
  public guestCount: number;

  @prop({ required: true })
  public housingType: HousingType;

  @prop({ required: true, min: 1, max: 8 })
  public roomCount: number;
}


export const RentalOfferModel = getModelForClass(RentalOfferEntity);
