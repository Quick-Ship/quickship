"use client";

import { API_URL, PackagesInterface } from "@/common";
import { GenerateShipmentInput, Header, Modal, Table } from "@/components";
import {
  AddPackagesToShipments,
  GenerateShipment,
  GetPackages,
} from "@/graphql";
import { useGeneratedGQLQuery, useGeneratedMutation } from "@/hooks";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiFieldSearch,
  EuiFieldText,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiSpacer,
  EuiTableSelectionType,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

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
  const [showModal, setShowModal] = useState(false);
  const [clientId, setClientId] = useState("");
  const [selectItems, setSelectItems] = useState<PackagesInterface[]>([]);
  const [dataPackages, setDataPackages] = useState<Array<PackagesInterface>>(
    []
  );
  const queryCache = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { globalToasts, pushToast } = useToastsContext();

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

  const onSelectionChange = (selectedItems: PackagesInterface[]) => {
    setSelectItems(selectedItems);
  };

  const selection: EuiTableSelectionType<PackagesInterface> = {
    selectable: (pkg: PackagesInterface) => pkg?.status?.id === 1,
    selectableMessage: (selectable) => (!selectable ? "packages main" : ""),
    onSelectionChange: onSelectionChange,
  };

  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getPackages", GetPackages, queryVars);

  const {
    mutate: mutateGenerateShipment,
    status: statusGenerateShipment,
    error: ErrorGenerateShipment,
  } = useGeneratedMutation(`${API_URL}/graphql`, GenerateShipment);

  const {
    mutate: mutateAddPackagesShipment,
    status: statusAddPackagesShipment,
    error: errorAddPackagesShipment,
  } = useGeneratedMutation(`${API_URL}/graphql`, AddPackagesToShipments);

  const onSubmit = (data: any) => {
    mutateGenerateShipment(
      {
        input: {
          comments: data.comments,
          clientId: Number(data.clientId),
          warehouseShipmentId: Number(data.warehouseShipmentId),
        },
      },
      {
        onSuccess: (data: any) => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Envio",
            text: <p>Envio creado</p>,
            color: "success",
          });
          pushToast(newToast);

          const selectPackages = selectItems.map((item: any) => item.guide);
          mutateAddPackagesShipment(
            {
              input: {
                shipmentId: data.generateShipment.id,
                guides: selectPackages,
              },
            },
            {
              onSuccess: () => {
                const newToast: Toast[] = [];
                newToast.push({
                  id: "2",
                  title: "Paquetes",
                  text: (
                    <p>Se agregaron correctamente los paquetes a la orden</p>
                  ),
                  color: "success",
                });
                pushToast(newToast);
                setShowModal(!showModal);
                if (isFetching === false) {
                  queryCache.removeQueries(["getPackages"], { stale: false });
                }
              },
              onError: () => {
                const newToast: Toast[] = [];
                newToast.push({
                  id: "3",
                  title: "Paquetes",
                  text: <p>No se pudieron agregar packates a la orden</p>,
                  color: "danger",
                });
                pushToast(newToast);
              },
            }
          );
        },
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "4",
            title: "Envio",
            text: <p>No se genero correctamenta la orden</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
      }
    );
  };

  useEffect(() => {
    const newPaging = {
      limit: pageSize,
      offset: pageSize * pageIndex,
    };
    setActionsPaging(newPaging);
  }, [pageIndex, pageSize]);

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
            id: pkg?.shipment === null ? "Sin N. envio" : pkg.shipment.id,
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
          <EuiButton
            disabled={selectItems.length <= 0}
            fill
            onClick={() => setShowModal(!showModal)}
          >
            Crear orden
          </EuiButton>
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
            noItemsMessage="No hay paquetes disponibles"
          />
        </EuiPanel>
      </EuiPanel>
      {showModal && (
        <>
          <Modal
            onCloseModal={() => setShowModal(!showModal)}
            titleModal={"Crear Orden"}
          >
            <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
              <GenerateShipmentInput
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
                  isLoading={statusGenerateShipment === "loading"}
                >
                  guardar
                </EuiButton>
              </EuiModalFooter>
            </EuiForm>
          </Modal>
        </>
      )}
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
