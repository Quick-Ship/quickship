import { gql } from "graphql-request";

export const QueryGetUsers = gql`
  query GetUsers(
    $paging: OffsetPaging
    $filter: UserFilter
    $sorting: [UserSort!]
  ) {
    users(paging: $paging, filter: $filter, sorting: $sorting) {
      nodes {
        id
      }
      totalCount
    }
  }
`;
