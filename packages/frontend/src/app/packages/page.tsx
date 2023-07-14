"use client";

import { API_URL } from "@/common";
import { Header, Table } from "@/components";
import { GetPackages, graphQLClient, useGeneratedGQLQuery } from "@/graphql";
import { usePaginationStore } from "@/zustand";
import {
  EuiBasicTableColumn,
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiTableSelectionType,
} from "@elastic/eui";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Packages = {
  id: number;
  guide: string;
  createdAt: string;
  client: {
    id: string;
  };
  status: {
    id: number;
    status: string;
    description: string;
  };
};

const fetchGetPackages = async () => {
  return await graphQLClient.request(GetPackages);
};

export default function Packages() {
  const [page, setPage] = useState(0);
  // const { isLoading, error, data, isFetching, status }: any = useQuery({
  //   queryKey: ["getPackages"],
  //   queryFn: fetchGetPackages,
  // });

  const rowsSize = [10, 20, 30];

  const {
    pageInfo: { hasNextPage, hasPreviousPage, endCursor, startCursor },
    pagingData,
    setPageInfo,
    setPagingData,
  } = usePaginationStore();

  const queryVars = {
    filter: {},
    paging: {
      first: 30,
    },
    sort: {},
  };

  useEffect(() => {
    setPagingData({
      endCursor: "",
      startCursor: "",
    });
  }, []);

  const { data, status }: any = useGeneratedGQLQuery(
    `${API_URL}/graphql`,
    "getPackages",
    GetPackages,
    queryVars
  );

  const [dataPackages, setDataPackages] = useState<Array<Packages>>([]);

  useEffect(() => {
    if (status === "success") {
      console.log(data);
      setDataPackages(
        data.packages.edges.map((pkg: any) => ({
          id: pkg.node.id,
          guide: pkg.node.guide,
          createdAt: pkg.node.createdAt,
          // client: {
          //   id: pkg.node.client.id,
          // },
          // status: {
          //   id: pkg.node.status.id,
          //   status: pkg.node.status.status,
          //   description: pkg.node.status.description,
          // },
        }))
      );
    }
  }, [data]);

  console.log(dataPackages);

  const [selectItems, setSelectItems] = useState<Packages[]>([]);

  const onSelectionChange = (selectedItems: Packages[]) => {
    setSelectItems(selectedItems);
  };

  const selection: EuiTableSelectionType<Packages> = {
    selectable: (pkg: Packages) =>
      pkg.id === 84,
    selectableMessage: (selectable) => (!selectable ? "packages main" : ""),
    onSelectionChange: onSelectionChange,
  };

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "status.description",
      name: "Estatus",
    },
    // {
    //   field: "client.id",
    //   name: "Cliente",
    // },
    {
      field: "createdAt",
      name: "Creado",
    },
  ];

  const totalItemCount = 80;

  const pagination = {
    // pageIndex: pageIndex,
    // pageSize: pageSize,
    // totalItemCount: totalItemCount,
    // pageSizeOptions: [3, 5, 8],
  };

  const onTableChange = ({ page, sort }: any) => {
    // if (page) {
    //   const { index: pageIndex, size: pageSize } = page;
    //   setPageIndex(pageIndex);
    //   setPageSize(pageSize);
    // }
    // if (sort) {
    //   const { field: sortField, direction: sortDirection } = sort;
    //   setSortField(sortField);
    //   setSortDirection(sortDirection);
    // }
  };

  if (status === "loading") {
    return (
      <EuiPanel style={{ margin: "2vh" }}>
        <EuiPageHeader>
          <EuiSkeletonText
            lines={1}
            size={"relative"}
            isLoading={status === "loading"}
          ></EuiSkeletonText>
        </EuiPageHeader>
        <EuiSkeletonText
          lines={6}
          size={"m"}
          isLoading={status === "loading"}
        ></EuiSkeletonText>
      </EuiPanel>
    );
  }

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={`Paquetes (${dataPackages.length})`}>
          {/* <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear cliente
            </EuiButton> */}
        </Header>
        <EuiHorizontalRule />
        <EuiPanel>
          <Table
            items={dataPackages}
            itemId="id"
            columns={columns}
            selection={selection}
            isSelectable={true}
            // pagination={pagination}
            // onChange={onTableChange}
          />
        </EuiPanel>
      </EuiPanel>
      {/* {showModal && (
        <>
          <Modal
            onCloseModal={() => setShowModal(!showModal)}
            titleModal={"Crear CLiente"}
          >
            <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
              <GeneralForm
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <EuiSpacer />
              <EuiModalFooter>
                <EuiButton onClick={() => setShowModal(!showModal)}>
                  cancelar
                </EuiButton>
                <EuiButton
                  type="submit"
                  fill
                  isLoading={createOneQueryStatus === "loading"}
                >
                  guardar
                </EuiButton>
              </EuiModalFooter>
            </EuiForm>
          </Modal> 
      </> 
      )}*/}
    </EuiPageHeaderContent>
  );
}
