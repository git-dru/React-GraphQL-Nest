import { Args, InputType, Field, Query, Resolver } from '@nestjs/graphql';

import { Track } from './track.model';
import { TrackService } from './track.service';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';

@InputType()
export class TrackInput {
  @Field()
  @IsOptional()
  @IsString()
  artistName?: string;

  @Field()
  @IsOptional()
  @IsString()
  genreName?: string;

  @Field()
  @IsOptional()
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(999999999)
  maxPrice?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  @Min(0)
  page?: number;

  @Field()
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(50)
  pageSize?: number;
}

@Resolver(() => Track)
export class TrackResolver {
  constructor(private readonly trackService: TrackService) {}

  @Query(() => Number)
  async getCount(@Args('input') input: TrackInput): Promise<number> {
    const [{ count }] = await this.trackService.getCount(input);
    return Math.ceil(count / input.pageSize);
  }

  @Query(() => [Track])
  async getTracks(@Args('input') input: TrackInput): Promise<Track[]> {
    const tracks = await this.trackService.getTracks(input);
    return tracks.map((t) => ({
      id: t.TrackId,
      name: t.TrackName,
      price: t.UnitPrice,
      duration: t.Milliseconds / 1000,
      genre: t.GenreName,
      artist: { id: t.ArtistId, name: t.ArtistName },
    }));
  }
}
