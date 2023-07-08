import { gql } from "graphql-request";

export const getMessengersQuery = gql`
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
