"use client";

import {
  EuiHeader,
  EuiHeaderSectionItem,
  EuiHeaderLogo,
  EuiHeaderLinks,
  EuiHeaderLink,
  EuiBasicTableColumn,
  EuiBasicTable,
} from "@elastic/eui";
import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import Link from "next/link";

// const UserQuery = gql`
//   query getUser {
//     clients {
//       id
//       firstName
//       lastName
//       createAt
//     }
//   }
// `;

// const graphQLClient = new GraphQLClient(
//   "https://quickship.onrender.com/graphql"
// );

// const fetchUser = async () => {
//   return await graphQLClient.request(UserQuery);
// };

export default function Home() {
  // const { isLoading, error, data, isFetching }: any = useQuery({
  //   queryKey: ["clients"],
  //   queryFn: fetchUser,
  // });

  // if (isLoading) return <p>'Loading...'</p>;

  // console.log(data?.clients);

  // const columns: Array<EuiBasicTableColumn<any>> = [
  //   {
  //     field: "firstName",
  //     name: "First Name",
  //   },
  //   {
  //     field: "lastName",
  //     name: "Last Name",
  //   },
  // ];
  return (
    <div>
      <p>home</p>
      <Link href="/about">Link to Home about</Link>
    </div>
  );
}


/**
 *     <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo>Elastic</EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLinks aria-label="App navigation links example">
          <EuiHeaderLink isActive>Docs</EuiHeaderLink>

          <EuiHeaderLink>Code</EuiHeaderLink>

          {/* <EuiBasicTable
            tableCaption="Demo of EuiBasicTable"
            items={data?.clients}
            rowHeader="firstName"
            columns={columns}
          // /> */

//           <EuiHeaderLink iconType="help">Help</EuiHeaderLink>
//         </EuiHeaderLinks>
//       </EuiHeaderSectionItem>
//     </EuiHeader>
//  */