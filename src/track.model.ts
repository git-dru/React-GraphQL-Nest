import { Field, ObjectType } from '@nestjs/graphql';
import { Artist } from './artist.model';
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

  @Field(() => Artist)
  artist: Artist;
}
