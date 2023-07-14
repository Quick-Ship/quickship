"use client";

import { GeneralForm, Header, Modal, Table } from "@/components";
import {
  CreateMessengerQuery,
  getMessengersQuery,
  graphQLClient,
} from "@/graphql";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSkeletonText,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

const fetchMessengers = async () => {
  return await graphQLClient.request(getMessengersQuery);
};

export default function Messengers() {
  const [showModal, setShowModal] = useState(false);
  const {
    isLoading,
    error,
    data,
    isFetching,
    status: getMessengerQuerystatus,
  }: any = useQuery({
    queryKey: ["getMessengers"],
    queryFn: fetchMessengers,
  });

  const {
    mutate,
    status: createOneMessengerStatus,
    error: createOneMessengerError,
  } = useMutation({
    mutationKey: ["createOneMessenger"],
    mutationFn: (messenger: any) => {
      return graphQLClient.request(CreateMessengerQuery, messenger);
    },
  });

  const queryCache: any = useQueryClient();
  const { globalToasts, pushToast } = useToastsContext();
  console.log(data)

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
          messenger: {
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
            title: "Mensajero",
            text: <p>No se pudo guardar correctamente, intenta de nuevo</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
        onSuccess: () => {
          if (isFetching === false) {
            queryCache.removeQueries("getMessengers", { stale: false });
          }
          setShowModal(false);
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Mensajero",
            text: <p>Creado correctamente</p>,
            color: "success",
          });
          pushToast(newToast);
        },
      }
    );
  };

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "node.id",
      name: "ID",
    },
    {
      field: "node.firstName",
      name: "Nombre",
    },
    {
      field: "node.lastName",
      name: "Apellido",
    },
    {
      field: "node.phone",
      name: "Telefono",
    },
    {
      field: "node.email",
      name: "Correo",
    },
  ];

  return (
    <EuiPageHeaderContent>
      {isLoading && getMessengerQuerystatus === "loading" ? (
        <EuiPanel style={{ margin: "2vh" }}>
          <EuiPageHeader>
            <EuiSkeletonText
              lines={1}
              size={"relative"}
              isLoading={isLoading && getMessengerQuerystatus === "loading"}
            ></EuiSkeletonText>
          </EuiPageHeader>
          <EuiSkeletonText
            lines={6}
            size={"m"}
            isLoading={isLoading && getMessengerQuerystatus === "loading"}
          ></EuiSkeletonText>
        </EuiPanel>
      ) : (
        <EuiPanel style={{ margin: "2vh" }}>
          <Header title={`Mensajeros (${data.messengers.edges.length})`}>
            <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear mensajero
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={data?.messengers?.edges} columns={columns} />
          </EuiPanel>
        </EuiPanel>
      )}
      {showModal && (
        <Modal
          onCloseModal={() => setShowModal(!showModal)}
          titleModal={"Crear mensajero"}
        >
          <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
            <GeneralForm
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <EuiModalFooter>
              <EuiButton onClick={() => setShowModal(!showModal)}>
                Cancelar
              </EuiButton>
              <EuiButton
                type="submit"
                fill
                isLoading={createOneMessengerStatus === "loading"}
              >
                Guardar
              </EuiButton>
            </EuiModalFooter>
          </EuiForm>
        </Modal>
      )}
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
