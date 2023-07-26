"use client";

import { API_URL } from "@/common";
import { Header, LoadingPage, Table } from "@/components";
import { ShipmentsQuery } from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import {
  EuiBasicTableColumn,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { useEffect, useState } from "react";

export default function Shipments() {
  const [shipments, setShipments] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getShipments", ShipmentsQuery);

  const [id, setId] = useState<number>(0);

  useEffect(() => {
    if (status === "success") {
      setShipments(
        data.shipments.nodes.map((sh: any) => ({
          id: sh.id,
          packages: sh.packages.totalCount,
          updatedAt: sh.updatedAt,
          status: sh.shipmentStatus.status,
          messenger: sh.messenger !== null ? sh.messenger.id : "Sin asignar",
        }))
      );
      setTotalCount(data.shipments.totalCount);
    }
  }, [status]);

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "packages",
      name: "Paradas",
    },
    {
      field: "status",
      name: "Estatus",
    },
    {
      field: "messenger",
      name: "Mensajero",
    },
    {
      field: "updatedAt",
      name: "Actualizada",
    },
    {
      field: "actions",
      name: "Acciones",
      actions: [
        {
          name: "ruta",
          description: "Ver ruta",
          type: "icon",
          icon: "visMapRegion",
          onClick: (item) => {
            setId(item.id);
          },
          href: `shipments/${id}`,
        },
      ],
    },
  ];

  return (
    <EuiPageHeaderContent>
      {status === "loading" ? (
        <LoadingPage isLoading={status === "loading"} />
      ) : (
        <EuiPanel style={{ margin: "2vh" }}>
          <Header title={`Ordenes (${totalCount})`}>{""}</Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={shipments} columns={columns} itemId={"id"} />
          </EuiPanel>
        </EuiPanel>
      )}
    </EuiPageHeaderContent>
  );
}
