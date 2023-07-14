import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import {
  gql,
  GraphQLClient,
  Variables,
} from "graphql-request";

export const useGeneratedGQLQuery = <TData, TError, TQuery, TVariables>(
  endpoint: string,
  queryName: string,
  query: string,
  queryVariables?: TVariables,
  options?: UseQueryOptions<TQuery, TError, TData>
): UseQueryResult<TData, TError> => {
  const queryData = useQuery<TQuery, TError, TData>(
    [queryName, queryVariables],
    async (): Promise<TQuery> => {
      const gqlQuery = gql`
        ${query}
      `;

      const graphqlUrl = endpoint.endsWith("/graphql")
        ? endpoint
        : `${endpoint}/graphql`;

      const client_ = new GraphQLClient(graphqlUrl);

      try {
        //@ts-ignore
        const result = await client_.request<TQuery, TVariables>(
          gqlQuery,
          queryVariables
        );

        return result;
      } catch (error: any) {
        error?.response?.errors?.forEach((error: any) => {
          if (
            error?.message.includes("Context creation failed: Unverified user")
          ) {
            window.alert("Usuario no autenticado, intenta recargar la página");
          }
        });
        return error;
      }
    },
    options
  );

  return queryData;
};
