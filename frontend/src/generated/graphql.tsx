import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Artist = {
  __typename?: 'Artist';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAlbumsForArtist: Array<Album>;
  getCount: Scalars['Float'];
  getTracks: Array<Track>;
};


export type QueryGetAlbumsForArtistArgs = {
  artistId: Scalars['Float'];
};


export type QueryGetCountArgs = {
  input: TrackInput;
};


export type QueryGetTracksArgs = {
  input: TrackInput;
};

export type Track = {
  __typename?: 'Track';
  artist: Artist;
  duration: Scalars['Float'];
  genre: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type TrackInput = {
  artistName: Scalars['String'];
  genreName: Scalars['String'];
  maxPrice: Scalars['Float'];
  minPrice: Scalars['Float'];
  page: Scalars['Float'];
  pageSize: Scalars['Float'];
};

export type GetTracksQueryVariables = Exact<{
  input: TrackInput;
}>;


export type GetTracksQuery = { __typename?: 'Query', getTracks: Array<{ __typename?: 'Track', id: number, name: string, price: number, duration: number, genre: string, artist: { __typename?: 'Artist', id: number, name: string } }> };

export type GetCountQueryVariables = Exact<{
  input: TrackInput;
}>;


export type GetCountQuery = { __typename?: 'Query', getCount: number };


export const GetTracksDocument = gql`
    query GetTracks($input: TrackInput!) {
  getTracks(input: $input) {
    id
    name
    price
    duration
    genre
    artist {
      id
      name
    }
  }
}
    `;

/**
 * __useGetTracksQuery__
 *
 * To run a query within a React component, call `useGetTracksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTracksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTracksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetTracksQuery(baseOptions: Apollo.QueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
}
export function useGetTracksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTracksQuery, GetTracksQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetTracksQuery, GetTracksQueryVariables>(GetTracksDocument, options);
}
export type GetTracksQueryHookResult = ReturnType<typeof useGetTracksQuery>;
export type GetTracksLazyQueryHookResult = ReturnType<typeof useGetTracksLazyQuery>;
export type GetTracksQueryResult = Apollo.QueryResult<GetTracksQuery, GetTracksQueryVariables>;
export const GetCountDocument = gql`
    query GetCount($input: TrackInput!) {
  getCount(input: $input)
}
    `;

/**
 * __useGetCountQuery__
 *
 * To run a query within a React component, call `useGetCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCountQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCountQuery(baseOptions: Apollo.QueryHookOptions<GetCountQuery, GetCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetCountQuery, GetCountQueryVariables>(GetCountDocument, options);
}
export function useGetCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCountQuery, GetCountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetCountQuery, GetCountQueryVariables>(GetCountDocument, options);
}
export type GetCountQueryHookResult = ReturnType<typeof useGetCountQuery>;
export type GetCountLazyQueryHookResult = ReturnType<typeof useGetCountLazyQuery>;
export type GetCountQueryResult = Apollo.QueryResult<GetCountQuery, GetCountQueryVariables>;