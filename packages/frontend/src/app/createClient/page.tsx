"use client";

import { API_URL, CreateClientType } from "@/common";
import { GeneralForm, Header } from "@/components";
import {
  EuiButton,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { useForm } from "react-hook-form";

export default function CreateClient() {

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  // const onSubmit = (data: any) => {
  //   mutation.mutate({
  //     input: {
  //       client: {
  //         firstName: data.firstName,
  //         lastName: data.lastName,
  //         phone: `+52 ${data.phone}`,
  //         email: data.email,
  //       },
  //     },
  //   });
  // };

  // if (mutation.isLoading) return <p>loading</p>;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        {/* <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}> */}
          <Header title={`Crear cliente`}>
            <EuiButton
              fill
              type="submit"
              // onClick={() => "/clients"}
              // href="/clients"
            >
              Guardar
            </EuiButton>
          </Header>
          <EuiHorizontalRule />
          <EuiPanel>
            <GeneralForm
              register={register}
              setValue={setValue}
              errors={errors}
            />
            <EuiSpacer />
          </EuiPanel>
        {/* </EuiForm> */}
      </EuiPanel>
    </EuiPageHeaderContent>

  );
}
