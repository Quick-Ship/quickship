import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, Variables } from "graphql-request";

export const useGenerateMutation = (
  endpoint: string,
  mutation: string,
  options?: any
) => {
  const mutationData = useMutation(
    async (variables: Variables): Promise<any> => {
      const graphqlUrl = endpoint.endsWith("/graphql")
        ? endpoint
        : `${endpoint}/graphql`;

      const _client = new GraphQLClient(graphqlUrl);

      try {
        const result = await _client.request(mutation, variables);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    options
  );

  return mutationData;
};
