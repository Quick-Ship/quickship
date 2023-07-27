"use client";

import { API_URL } from "@/common";
import { Header, LoadingPage, Popover, Table } from "@/components";
import {
  AssignCourierShipment,
  ShipmentsQuery,
  graphQLClient,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiFieldText,
  EuiFormRow,
  EuiHorizontalRule,
  EuiLink,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface AssignCourierProps {
  id: any;
  mutate: any;
  assignCourierShipmentStatus: "success" | "loading" | "error" | "idle";
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const AssignCourier: React.FC<AssignCourierProps> = ({
  id,
  mutate,
  assignCourierShipmentStatus,
  onSuccess,
  onError,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [idValue, setIdValue] = useState({ id: "" });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setIdValue({ ...idValue, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutate(
      { input: { shipmentId: id, courierId: Number(idValue.id) } },
      {
        onSuccess: onSuccess,
        onError: onError,
      }
    );
    setIdValue({ id: "" });
  };

  return (
    <Popover
      button={
        <EuiLink
          onClick={() => {
            setPopoverOpen(!isPopoverOpen);
          }}
        >
          No asignado
        </EuiLink>
      }
      isPopoverOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(!isPopoverOpen)}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <EuiFormRow label="Ingresa id mensajero">
          <EuiFieldText name="id" value={idValue.id} onChange={onChange} />
        </EuiFormRow>
        <EuiButton
          style={{ marginLeft: "1em" }}
          isLoading={assignCourierShipmentStatus === "loading"}
          onClick={onSubmit}
          isDisabled={idValue.id === ""}
        >
          Asignar
        </EuiButton>
      </div>
    </Popover>
  );
};

export default function Shipments() {
  const queryCache: any = useQueryClient();
  const [shipments, setShipments] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [id, setId] = useState<number>(0);
  const { globalToasts, pushToast } = useToastsContext();

  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getShipments", ShipmentsQuery);

  const { mutate, status: assignCourierShipmentStatus } = useMutation({
    mutationKey: ["assignCourierShipment"],
    mutationFn: (assignCourierShipment: any) => {
      return graphQLClient.request(
        AssignCourierShipment,
        assignCourierShipment
      );
    },
  });

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
      render: (messenger: any, id: any) => {
        return (
          <div>
            {messenger !== "Sin asignar" ? (
              messenger
            ) : (
              <AssignCourier
                id={id.id}
                mutate={mutate}
                assignCourierShipmentStatus={assignCourierShipmentStatus}
                onSuccess={(data: any) => {
                  if (isFetching === false) {
                    queryCache.removeQueries("getShipments", { stale: false });
                    const newToast: Toast[] = [];
                    newToast.push({
                      id: "1",
                      title: "Mensajero",
                      text: <p>Asignado correctamente</p>,
                      color: "success",
                    });
                    pushToast(newToast);
                  }
                }}
                onError={(error: any) => {
                  const newToast: Toast[] = [];
                  newToast.push({
                    id: "2",
                    title: "Mensajero",
                    text: <p>{error.response.errors[0].message}</p>,
                    color: "danger",
                  });
                  pushToast(newToast);
                }}
              />
            )}
          </div>
        );
      },
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
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
