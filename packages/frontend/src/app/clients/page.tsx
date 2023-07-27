"use client";

import {
  ErrorPage,
  GeneralForm,
  Header,
  LoadingPage,
  Modal,
  Table,
} from "@/components";
import { ClientsQuery, CreateOneClientQuery, graphQLClient } from "@/graphql";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL, ClientsInterface } from "@/common";
import { useGeneratedGQLQuery } from "@/hooks";

export default function Clients() {
  const queryCache: any = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState<ClientsInterface[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { globalToasts, pushToast } = useToastsContext();

  const {
    data,
    isFetching,
    status: getQueryClientsStatus,
  } = useGeneratedGQLQuery<unknown | any, unknown | any, unknown, unknown>(
    `${API_URL}/graphql`,
    "getClients",
    ClientsQuery
  );

  const { mutate, status: createOneQueryStatus } = useMutation({
    mutationKey: ["createOneClient"],
    mutationFn: (client: any) => {
      return graphQLClient.request(CreateOneClientQuery, client);
    },
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    mutate(
      {
        input: {
          client: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: `+52 ${data.phone}`,
            email: data.email,
          },
        },
      },
      {
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "2",
            title: "Cliente",
            text: <p>No se pudo guardar correctamente, intenta de nuevo</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
        onSuccess: () => {
          if (isFetching === false) {
            queryCache.removeQueries("getClients", { stale: false });
          }
          setShowModal(false);
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Cliente",
            text: <p>Creado correctamente</p>,
            color: "success",
          });
          pushToast(newToast);
        },
      }
    );
  };

  useEffect(() => {
    if (getQueryClientsStatus === "success") {
      setClients(
        data.clients.nodes.map((cl: any) => ({
          id: cl.id,
          firstName: cl.firstName,
          lastName: cl.lastName,
          phone: cl.phone,
          email: cl.email,
        }))
      );
      setTotalCount(data.clients.totalCount);
    }
  }, [getQueryClientsStatus]);

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "firstName",
      name: "Nombre",
    },
    {
      field: "lastName",
      name: "Apellido",
    },
    {
      field: "phone",
      name: "Telefono",
    },
    {
      field: "email",
      name: "Correo",
    },
  ];

  return (
    <EuiPageHeaderContent>
      {getQueryClientsStatus === "loading" ? (
        <LoadingPage isLoading={getQueryClientsStatus === "loading"} />
      ) : (
        <EuiPanel style={{ margin: "2vh" }}>
          <Header title={`Clientes (${totalCount})`}>
            <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear cliente
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={clients} columns={columns} itemId={"id"} />
          </EuiPanel>
        </EuiPanel>
      )}
      {showModal && (
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
      )}
      {getQueryClientsStatus === "error" && (
        <ErrorPage message="Error al cargar clientes" />
      )}
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
