"use client";

import { GeneralForm, Header } from "@/components";
import {
  EuiButton,
  EuiCode,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { InputCreateShipment } from "./inputCreateShipment";
import { useForm } from "react-hook-form";

export default function CreateShipment() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={`Ordenes ()`}>{""}</Header>
        <EuiHorizontalRule />
        <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
          <InputCreateShipment
            register={register}
            setValue={setValue}
            errors={errors}
          />
          <EuiButton type="submit">submit</EuiButton>
        </EuiForm>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
