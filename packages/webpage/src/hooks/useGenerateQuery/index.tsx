import { UseQueryOptions, UseQueryResult, useQuery } from "@tanstack/react-query";
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
  
        const graphQLClient = new GraphQLClient(graphqlUrl, {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjE5MGFkMTE4YTk0MGFkYzlmMmY1Mzc2YjM1MjkyZmVkZThjMmQwZWUiLCJ0eXAiOiJKV1QifQ.eyJpZFVzZXIiOjEsInRlbmFudCI6IlVTRVIiLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcXVpY2tzaGlwLWY5YTc4IiwiYXVkIjoicXVpY2tzaGlwLWY5YTc4IiwiYXV0aF90aW1lIjoxNjkzOTgxMDI3LCJ1c2VyX2lkIjoiSVB3UjhTOHQ0RGdHRXlaS3VtbkJvcVNzb000MyIsInN1YiI6IklQd1I4Uzh0NERnR0V5Wkt1bW5Cb3FTc29NNDMiLCJpYXQiOjE2OTQwNjA2MTEsImV4cCI6MTY5NDA2NDIxMSwiZW1haWwiOiJhbmRyZXMubXVjaW5vQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaG9uZV9udW1iZXIiOiIrNTI1NTk4NjUzMjU0IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhbmRyZXMubXVjaW5vQGdtYWlsLmNvbSJdLCJwaG9uZSI6WyIrNTI1NTk4NjUzMjU0Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.MU8EKJFjOlLjmH1F0UqtXFsqMYDmie7CMJPf5A7bQfDFTEOdfachNGzvFST_ytQ-ZZlYjTbWDTxFfF5SCDPkZXFLizqOj8PnNd6RiyVAn755N0_AFbPT_bRZjJuS5TaVndBRjtG8LAeqdUHoDM1KX9-5Mb19DoHD51pBSvTY4Xsz1t68gYOL_DkOu7ThP3jj0lOBMAZOlYlpw-jRX7Mk9IQGljuV2_JoinQKtbHye1c3ywWp6ZFimkWs4waMEm1j8P-sFsFo72z93FeFC2DLlF2Mr6qDB2gJzzk9Y0kkx5p0X7ixgg_VmDnivKyHmjHq2PWTBp0hKTEqGP--YUtJww`,
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
