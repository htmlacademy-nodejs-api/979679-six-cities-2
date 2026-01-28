import { defaultClasses, getModelForClass, modelOptions, prop, type Ref } from '@typegoose/typegoose';
import { UserEntity } from '../user/index.js';
import { RentalOfferEntity } from '../rental-offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface PremiumOfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'premium-offer',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class PremiumOfferEntity extends defaultClasses.TimeStamps {
  @prop({ required: true, ref: UserEntity, })
  public userId!: Ref<UserEntity>;

  @prop({ required: true, ref: RentalOfferEntity })
  public offerId!: Ref<RentalOfferEntity>;
}


export const PremiumOfferModel = getModelForClass(PremiumOfferEntity);
