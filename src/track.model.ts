import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Track {
  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  price: number;

  @Field()
  duration: number;

  @Field()
  genre: string;
}
