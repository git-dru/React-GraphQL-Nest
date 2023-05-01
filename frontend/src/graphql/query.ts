import { gql } from '@apollo/client';

const QUERY_GET_TRACKS = gql`
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

const QUERY_GET_COUNT = gql`
  query GetCount($input: TrackInput!) {
    getCount(input: $input)
  }
`;
