import { gql } from "graphql-request";

export const GetPackages = gql`
  query GetPackages(
    $paging: CursorPaging
    $filter: PackageFilter
    $sorting: [PackageSort!]
  ) {
    packages(paging: $paging, filter: $filter, sorting: $sorting) {
      edges {
        node {
          id
          guide
          createdAt
        #   client {
        #     id
        #   }
        #   status {
        #     id
        #     status
        #     description
        #   }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
