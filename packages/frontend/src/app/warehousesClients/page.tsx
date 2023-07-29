"use client";

import { API_URL, WarehouseShipmentsInterface } from "@/common";
import { Header, Modal, TableBody } from "@/components";
import { GetWarehouseShipments } from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
  EuiText,
} from "@elastic/eui";
import { ReactNode, useEffect, useState } from "react";
import { InputWarehouseClient } from "./inputWarehouseClient";
import { useForm } from "react-hook-form";

export default function WarehousesClients() {
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
  const [totalCount, setTotalCount] = useState(0);
  const [warehouhseClients, setWarehouseClients] = useState<
    WarehouseShipmentsInterface[]
  >([]);
  const [showModal, setShowModal] = useState(false);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, ReactNode>
  >({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  const queryVars = {
    filter: {},
    paging: actionsPaging,
    sorting: [],
  };
  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(
    `${API_URL}/graphql`,
    "getWarehouseShipments",
    GetWarehouseShipments,
    queryVars
  );

  const onSubmit = (data: any) => {
    const input = {
      input: {
        instructions: "",
        clientId: 0,
        direction: {
          street: "",
          neigthboorhood: "",
          municipality: "",
          state: "",
          zipCode: "",
          externalNumber: "",
          internalNumber: "",
          latitude: 0,
          longitude: 0,
        },
        contact: {
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
        },
      },
    };
    console.log(data);
  };

  useEffect(() => {
    if (status === "success") {
      setWarehouseClients(
        data.warehouseShipments.nodes.map((wc: any) => ({
          id: wc.id,
          instructions: wc.instructions,
          fullNAme: `${wc.contact.firstName} ${wc.contact.lastName}`,
          phone: wc.contact.phone,
          email: wc.contact.email,
          street: wc.direction.street,
          neigthboorhood: wc.direction.neigthboorhood,
          municipality: wc.direction.municipality,
          state: wc.direction.state,
          externalNumber: wc.direction.externalNumber,
          internalNumber: wc.direction.internalNumber,
          zipCode: wc.direction.zipCode,
          latitude: wc.direction.latitude,
          longitude: wc.direction.longitude,
          idClient: wc.client.id,
          fullNameClient: `${wc.client.firstName} ${wc.client.lastName}`,
          phoneClient: wc.client.phone,
          emailClient: wc.client.email,
          createdAt: wc.createdAt,
          updatedAt: wc.updatedAt,
        }))
      );
      setTotalCount(data.warehouseShipments.totalCount);
    }
  }, [status]);

  const toggleDetails = (item: any) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const [expand] = warehouhseClients.filter(
        (i: any) => i === item
      );

      console.log(expand)

      const listitemContact = [
        {
          description: `${expand.id}`,
          title: "Nombre",
        },
        {
          description: ``,
          title: "Apellido",
        },
        {
          description: ``,
          title: "Telefono",
        },
        {
          description: ``,
          title: "Correo",
        },
      ];

      const listItemDirection = [
        {
          description: ``,
          title: "Calle",
        },
        {
          description: ``,
          title: "Colonia",
        },
        {
          description: ``,
          title: "Delegación",
        },
        {
          description: ``,
          title: "Ciudad",
        },
        {
          description: ``,
          title: "Numero exterior",
        },
        {
          description: ``,
          title: "Numero interior",
        },
        {
          description: ``,
          title: "Codigo postal",
        },
      ];

      itemIdToExpandedRowMapValues[item.id] = (
        <div style={{ display: "flex" }}>
          <div>
            <EuiText style={{ marginBottom: "2px" }}>
              <h2>Contacto</h2>
            </EuiText>
            <EuiDescriptionList
              listItems={listitemContact}
              type="responsiveColumn"
              style={{ marginBottom: "2px" }}
            />
          </div>
          <div>
            <EuiText style={{ marginBottom: "2px" }}>
              <h2>Dirección</h2>
            </EuiText>
            <EuiDescriptionList
              listItems={listItemDirection}
              type="responsiveColumn"
              style={{ marginBottom: "2px" }}
            />
          </div>
        </div>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "idClient",
      name: "id Cliente",
    },
    {
      field: "fullNameClient",
      name: "Cliente",
    },
    {
      field: "createdAt",
      name: "Fecha de creación",
    },
    {
      field: "updatedAt",
      name: "Fecha de actualización",
    },
    {
      align: "right",
      width: "80px",
      isExpander: true,
      name: "Actions",
      render: (user: any) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
        return (
          <EuiButtonIcon
            onClick={() => toggleDetails(user)}
            aria-label={
              itemIdToExpandedRowMapValues[user.id] ? "Collapse" : "Expand"
            }
            iconType={
              itemIdToExpandedRowMapValues[user.id] ? "arrowDown" : "arrowRight"
            }
          />
        );
      },
    },
  ];

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
        <Header title={`Almacenes clientes (${totalCount})`}>
          <EuiButton
            // disabled={selectItems.length <= 0}
            fill
            onClick={() => setShowModal(!showModal)}
          >
            Crear almacén
          </EuiButton>
        </Header>
        <EuiHorizontalRule />
        <EuiPanel>
          <TableBody
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            columns={columns}
            items={warehouhseClients}
            totalItemCount={totalCount}
            pageSizeOptions={pageSizeOptions}
            // itemIdToExpandedRowMap={0}
            noItemsMessage={"No se encontraron Almacenes"}
            itemId={"id"}
          />
        </EuiPanel>
      </EuiPanel>
      {showModal && (
        <Modal
          onCloseModal={() => setShowModal(!showModal)}
          titleModal={"Crear Almacén"}
          minWdith={1000}
        >
          <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <InputWarehouseClient
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <EuiModalFooter>
              <EuiButton onClick={() => setShowModal(!showModal)}>
                Cancelar
              </EuiButton>
              <EuiButton type="submit">Guardar</EuiButton>
            </EuiModalFooter>
          </EuiForm>
        </Modal>
      )}
    </EuiPageHeaderContent>
  );
}
