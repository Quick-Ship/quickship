"use client";

import { API_URL, MessengerInterface } from "@/common";
import { GeneralForm, Header, LoadingPage, Modal, Table } from "@/components";
import {
  CreateMessengerQuery,
  GetMessengersQuery,
  graphQLClient,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiButton,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Messengers() {
  const queryCache: any = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [messengers, setMessengers] = useState<MessengerInterface[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);

  const { globalToasts, pushToast } = useToastsContext();

  const {
    data,
    isFetching,
    status: getMessengerQuerystatus,
  } = useGeneratedGQLQuery<unknown | any, unknown, unknown, unknown>(
    `${API_URL}/graphql`,
    "getMessengers",
    GetMessengersQuery
  );

  const {
    mutate,
    status: createOneMessengerStatus,
  } = useMutation({
    mutationKey: ["createOneMessenger"],
    mutationFn: (messenger: any) => {
      return graphQLClient.request(CreateMessengerQuery, messenger);
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

  useEffect(() => {
    if (getMessengerQuerystatus === "success") {
      setMessengers(
        data.messengers?.nodes.map((messenger: any) => ({
          id: messenger.id,
          firstName: messenger.firstName,
          lastName: messenger.lastName,
          phone: messenger.phone,
          email: messenger.email,
        }))
      );
      setTotalCount(data.messengers.totalCount);
    }
  }, [getMessengerQuerystatus]);

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
      {getMessengerQuerystatus === "loading" ? (
        <LoadingPage isLoading={getMessengerQuerystatus === "loading"} />
      ) : (
        <EuiPanel style={{ margin: "2vh" }}>
          <Header title={`Mensajeros (${totalCount})`}>
            <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear mensajero
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <Table items={messengers} columns={columns} itemId={"id"} />
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
