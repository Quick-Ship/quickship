import { gql } from "graphql-request";

export const GetMessengersQuery = gql`
  query getMessengers {
    messengers {
      edges {
        node {
          id
          firstName
          lastName
          phone
          email
        }
      }
    }
  }
`;
