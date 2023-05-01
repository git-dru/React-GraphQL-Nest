import { Injectable } from '@nestjs/common';
import { Database } from 'sqlite3';
import { TrackInput } from './track.resolver';

export interface TrackOutput {
  TrackId: number;
  TrackName: string;
  GenreName: string;
  UnitPrice: number;
  ArtistName: string;
  Milliseconds: number;
}
@Injectable()
export class TrackService {
  constructor(private readonly db: Database) {}

  getTracks(trackInput: TrackInput) {
    const { artistName, genreName, minPrice, maxPrice, page, pageSize } =
      trackInput;
    return new Promise<TrackOutput[]>((resolve, reject) => {
      this.db.all(
        `SELECT Track.TrackId, Track.Name as TrackName, Track.Milliseconds, track.UnitPrice, Genre.Name as GenreName, Artist.Name as ArtistName
              From Track 
              LEFT JOIN Album ON Track.AlbumId= Album.AlbumId
              JOIN Artist ON Album.ArtistId = Artist.ArtistId
              LEFT JOIN MediaType ON Track.MediaTypeId = MediaType.MediaTypeId
              LEFT JOIN Genre ON Track.GenreId= Genre.GenreId
              where Artist.Name like '%${artistName}%' and Genre.Name like '%${genreName}%' and Track.UnitPrice >= ${minPrice} and Track.UnitPrice < ${maxPrice}
              ORDER BY  Track.TrackId ASC
              LIMIT ${pageSize} OFFSET ${page * pageSize}`,
        (error, data: TrackOutput[]) => {
          if (error) reject(error);
          else resolve(data);
        },
      );
    });
  }
}
