import { defaultClasses, getModelForClass, modelOptions, prop, type Ref } from '@typegoose/typegoose';
import { RentalOfferEntity } from '../rental-offer/index.js';
import { UserEntity } from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface RatingEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'rating',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class RatingEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, min: 0, max: 5, validate: {
    validator: (v: number) => Number.isInteger(v * 10),
    message: 'Rating must have at most 1 decimal place',
  } })
  public rating!: number;

  @prop({ required: true, ref: RentalOfferEntity })
  public offerId!: Ref<RentalOfferEntity>;

  @prop({ required: true, ref: UserEntity })
  public userId!: Ref<UserEntity>;
}


export const RatingEntityModel = getModelForClass(RatingEntity);
