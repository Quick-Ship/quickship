"use client";

import { Header, Table } from "@/components";
import {
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";

export default function Packages() {
  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={`Paquetes ()`}>
          {/* <EuiButton onClick={() => setShowModal(!showModal)}>
              Crear cliente
            </EuiButton> */}
        </Header>
        <EuiHorizontalRule />
        <EuiPanel>
          <Table items={[]} columns={[]} />
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
