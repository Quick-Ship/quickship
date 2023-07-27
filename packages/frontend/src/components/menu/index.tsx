import {
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

/**
 * history packages
 * warehouse
 * create delivery
 */

export const Menu = () => {
  return (
    <EuiListGroup>
      <EuiListGroupItem
        iconType="home"
        label="Home"
        onClick={() => "/"}
        isActive
        href="/"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="users"
        onClick={() => "/clients"}
        label="Clientes"
        href="/clients"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="kubernetesNode"
        label="Almacenes clientes"
        onClick={() => "/warehouseClients"}
        href="/warehouseClients"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="importAction"
        iconProps={{ color: "default" }}
        onClick={() => "/generatePackages"}
        label="Generar paquetes"
        href="/generatePackages"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="documentEdit"
        label="Crear Envio"
        onClick={() => "/createShipment"}
        href="/createShipment"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="package"
        label="Paquetes"
        onClick={() => "/packages"}
        href="/packages"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="kubernetesPod"
        label="historial de paquetes"
        onClick={() => "/packagesHistory"}
        href="/packagesHistory"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="dotInCircle"
        label="Envios"
        onClick={() => "/shipments"}
        href="/shipments"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        onClick={() => "/messengers"}
        iconType="timeline"
        label="Mensajeros"
        href="/messengers"
      />
    </EuiListGroup>
  );
};
