"use client";

import { Header } from "@/components";
import {
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";

export default function PackagesHistory() {
  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={`Historial de paquetes `}>
          {''}
        </Header>
        <EuiHorizontalRule />
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
