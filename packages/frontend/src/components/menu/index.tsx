import {
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

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
        iconType="importAction"
        iconProps={{ color: "default" }}
        onClick={() => "/generatePackages"}
        label="Generar paquetes"
        href="/generatePackages"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="package"
        label="Packages"
        onClick={() => "/packages"}
        href="/packages"
      />
      <EuiHorizontalRule />
      <EuiListGroupItem
        iconType="visMapRegion"
        label="Generar Envio"
        onClick={() => "/generateShipments"}
        href="/generateShipments"
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
