import { gql } from "graphql-request";

export const GetWarehouseClients = gql`
  query WarehouseShipments(
    $paging: OffsetPaging
    $filter: WarehouseShipmentFilter
    $sorting: [WarehouseShipmentSort!]
  ) {
    warehouseShipments(filter: $filter, paging: $paging, sorting: $sorting) {
      nodes {
        id
        instructions
        contact {
          firstName
          lastName
          phone
          email
        }
        direction {
          street
          neigthboorhood
          municipality
          state
          externalNumber
          internalNumber
          zipCode
          latitude
          longitude
        }
        client {
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
