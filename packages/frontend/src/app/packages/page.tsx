"use client";

import { API_URL } from "@/common";
import { Header, Table } from "@/components";
import { GenerateShipment, GetPackages } from "@/graphql";
import { useGeneratedGQLQuery, useGeneratedMutation } from "@/hooks";
import {
  EuiBasicTableColumn,
  EuiFieldSearch,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiSpacer,
  EuiTableSelectionType,
} from "@elastic/eui";
import { useEffect, useState } from "react";

type Packages = {
  id: number;
  guide: string;
  createdAt: string;
  client: {
    id: string;
  };
  shipment: {
    id: string;
  };
  status: {
    id: number;
    status: string;
    description: string;
  };
};

export default function Packages() {
  const initialIndex = 0;
  const initialPageZize = 10;
  const pageSizeOptions = [
    initialPageZize,
    initialPageZize * 2,
    initialPageZize * 4,
  ];
  const [pageIndex, setPageIndex] = useState<number>(initialIndex);
  const [pageSize, setPageSize] = useState<number>(initialPageZize);
  const [actionsPaging, setActionsPaging] = useState<any>({
    limit: pageSize,
    offset: pageIndex * pageSize,
  });

  const [clientId, setClientId] = useState("");

  const queryVars = {
    filter: {
      ...(clientId != "" && {
        clientId: {
          eq: Number(clientId),
        },
      }),
    },
    paging: actionsPaging,
    sort: {},
  };

  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getPackages", GetPackages, queryVars);

  const { mutate } = useGeneratedMutation(
    `${API_URL}/graphql`,
    GenerateShipment
  );

  useEffect(() => {
    const newPaging = {
      limit: pageSize,
      offset: pageSize * pageIndex,
    };
    setActionsPaging(newPaging);
  }, [pageIndex, pageSize]);

  const [dataPackages, setDataPackages] = useState<Array<Packages>>([]);

  useEffect(() => {
    if (status === "success") {
      setDataPackages(
        data?.packages?.nodes.map((pkg: any) => ({
          id: pkg.id,
          guide: pkg.guide,
          updatedAt: pkg.updatedAt,
          client: {
            id: pkg.client.id,
          },
          shipment: {
            id: pkg?.shipment === null ? "No tiene orden" : pkg.shipment.id,
          },
          status: {
            id: pkg.status.id,
            status: pkg.status.status,
            description: pkg.status.description,
          },
        }))
      );
    }
  }, [data, status]);

  const [selectItems, setSelectItems] = useState<Packages[]>([]);

  const onSelectionChange = (selectedItems: Packages[]) => {
    setSelectItems(selectedItems);
  };

  const selection: EuiTableSelectionType<Packages> = {
    selectable: (pkg: Packages) => pkg.id !== 0,
    selectableMessage: (selectable) => (!selectable ? "packages main" : ""),
    onSelectionChange: onSelectionChange,
  };

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
      width: "50px",
    },
    {
      field: "guide",
      name: "Guia",
    },
    {
      field: "status.description",
      name: "Estatus",
    },
    {
      field: "shipment.id",
      name: "Numero de envio",
    },
    {
      field: "client.id",
      name: "Cliente",
    },
    {
      field: "updatedAt",
      name: "Actualizado",
    },
  ];

  const onTableChange = ({ page = {} }: any) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: data?.packages?.totalCount,
    pageSizeOptions: pageSizeOptions,
    hidePerPageOptions: false,
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
        <Header title={`Paquetes (${data?.packages?.totalCount})`}>
          {/* <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear cliente
            </EuiButton> */}
        </Header>
        <EuiHorizontalRule />
        <EuiPanel>
          <EuiFormRow label="Id de cliente">
            <EuiFieldSearch
              style={{ minWidth: 160 }}
              onChange={(e) => {
                setClientId(e.target.value);
              }}
              placeholder="id"
              value={clientId}
            />
          </EuiFormRow>
          <EuiSpacer />
          <Table
            items={dataPackages}
            itemId="id"
            columns={columns}
            selection={selection}
            isSelectable={true}
            pagination={pagination}
            onChange={onTableChange}
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
