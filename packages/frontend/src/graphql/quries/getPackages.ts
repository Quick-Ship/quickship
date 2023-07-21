import { gql } from "graphql-request";

export const GetPackages = gql`
  query GetPackages(
    $paging: OffsetPaging
    $filter: PackageFilter
    $sorting: [PackageSort!]
  ) {
    packages(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
        guide
        createdAt
        updatedAt
        clientId
        client {
          id
        }
        shipment {
          id
        }
        status {
          id
          status
          description
        }
      }
      totalCount
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;
