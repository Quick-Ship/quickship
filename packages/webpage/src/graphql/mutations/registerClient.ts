import { gql } from "graphql-request";

export const RegisterClient = gql`
  mutation RegisterClient($input: InputCreateClient!) {
    registerClient(input: $input) {
      url
    }
  }
`;
