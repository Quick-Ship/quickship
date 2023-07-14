import { gql } from "graphql-request";

export const CreateOManyPackages = gql`
  mutation CreateManyPackages($input: CreateManyPackagesInput!) {
    createManyPackages(input: $input) {
      id
    }
  }
`;
