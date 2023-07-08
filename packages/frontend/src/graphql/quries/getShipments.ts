import { gql } from "graphql-request";

export const ShipmentsQuery = gql`
  query getShipments {
    shipments {
      nodes {
        id
        shipmentStatus {
          id
          status
        }
        # warehouseShipment {
        #   id
        #   client {
        #     id
        #   }
        # }
        packages {
          nodes {
            id
            guide
          }
        }
        messenger {
          id
        }
        updatedAt
      }
    }
  }
`;
