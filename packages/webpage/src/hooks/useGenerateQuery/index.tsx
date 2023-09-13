import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from "@tanstack/react-query";
import { GraphQLClient, Variables } from "graphql-request";

export const useGenerateQuery = (
  endpoint: string,
  queryName: string,
  query: string,
  queryVariables?: Variables,
  options?: UseQueryOptions<
    unknown,
    unknown,
    unknown,
    (string | Variables | undefined)[]
  >
): UseQueryResult => {
  const queryData = useQuery(
    [queryName, queryVariables],
    async () => {
      const graphqlUrl = endpoint.endsWith("/graphql")
        ? endpoint
        : `${endpoint}/graphql`;

      let token: any;

      if (typeof window !== "undefined") {
        token = JSON.parse(window.localStorage.getItem("user") as string);
      }

      const graphQLClient = new GraphQLClient(graphqlUrl, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token.stsTokenManager.accessToken}`,
        },
      });

      try {
        const result = await graphQLClient.request(query, queryVariables);
        return result;
      } catch (error) {
        console.log(error);
      }
    },
    options
  );

  return queryData;
};
