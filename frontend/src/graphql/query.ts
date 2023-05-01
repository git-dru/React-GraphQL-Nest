import { gql } from '@apollo/client';

const QUERY_GET_TRACKS = gql`
  query GetTracks($input: TrackInput!) {
    getTracks(input: $input) {
      id
      name
      price
      duration
      genre
    }
  }
`;
