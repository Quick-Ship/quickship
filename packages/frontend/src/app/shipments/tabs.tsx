import {
  MessengerShipmentInterface,
  PackagesShipmentInterface,
  WarehouseShipmentInterface,
} from "@/common";
import { Popover, SimpleList, Tabs } from "@/components";
import {
  EuiAvatar,
  EuiDescriptionList,
  EuiImage,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import { useState } from "react";
import Image from "next/image";

interface TabWarehouseProps {
  warehouseShipment: WarehouseShipmentInterface;
}

interface PackagesTabsProps {
  packagesShipment: Array<PackagesShipmentInterface>;
}

interface MessengerTabProps {
  messenger: MessengerShipmentInterface;
  children: React.ReactNode;
}

export const WarehouseTab: React.FC<TabWarehouseProps> = ({
  warehouseShipment,
}) => {
  return (
    <Tabs
      tabs={[
        {
          id: "almacen--id",
          name: "Almacén",
          content: (
            <>
              <EuiSpacer />
              <EuiDescriptionList
                listItems={[
                  {
                    title: "Dirección",
                    description: `${warehouseShipment.street}, ${
                      warehouseShipment.externalNumber
                    }, ${
                      warehouseShipment.internalNumber === 0
                        ? ""
                        : warehouseShipment.internalNumber
                    }, ${warehouseShipment.neigthboorhood}, ${
                      warehouseShipment.municipality
                    }, ${warehouseShipment.state}, ${
                      warehouseShipment.zipCode
                    }`,
                  },
                ]}
              />
              <SimpleList
                title={"Contacto:"}
                description={`${warehouseShipment.firstName} ${warehouseShipment.lastName}`}
              />
              <SimpleList
                title="Télefono"
                description={`${warehouseShipment.phone}`}
              />
              <SimpleList
                title="Correo"
                description={`${warehouseShipment.email}`}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const PackagesTabs: React.FC<PackagesTabsProps> = ({
  packagesShipment,
}) => {
  return (
    <>
      {packagesShipment.map((i, index) => {
        console.log(i.evidences);
        return (
          <Tabs
            key={index}
            tabs={[
              {
                id: "direction--id",
                name: "Informacion General",
                content: (
                  <>
                    <EuiSpacer />
                    <EuiDescriptionList
                      listItems={[
                        {
                          title: "Dirección",
                          description: `${i.street}, ${i.externalNumber}, ${
                            i.internalNumber === 0 ? "" : i.internalNumber
                          }, ${i.neigthboorhood}, ${i.municipality}, ${
                            i.state
                          }, ${i.zipCode}`,
                        },
                      ]}
                    />
                    <SimpleList
                      title={"Contacto:"}
                      description={`${i.firstName} ${i.lastName}`}
                    />
                    <SimpleList title="Télefono" description={`${i.phone}`} />
                    <SimpleList title="Correo" description={`${i.email}`} />
                  </>
                ),
              },
              {
                id: "evidences--id",
                name: "Evidencias",
                content: (
                  <div>
                    {i.evidences.map((ev, index) => (
                      <div style={{ width: "100%" }} key={ev.id}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ marginRight: "5rem" }}>
                            <SimpleList
                              title="Comentarios"
                              description={`${ev.comments}`}
                            />
                            <SimpleList
                              title="Reribido"
                              description={`${ev.personReceived}`}
                            />
                            <SimpleList
                              title="Fecha"
                              description={`${ev.createdAt}`}
                            />
                          </div>
                          <div>
                            <EuiImage
                              size="m"
                              hasShadow
                              caption={""}
                              alt=""
                              width={100}
                              height={200}
                              src={`https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80`}
                            />
                          </div>
                        </div>
                        <EuiSpacer />
                      </div>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        );
      })}
    </>
  );
};

export const MessengerTabs: React.FC<MessengerTabProps> = ({
  messenger,
  children,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      {messenger.id === undefined ? (
        <>
          <EuiPanel style={{ display: "flex" }} color="subdued">
            <EuiAvatar
              size="xl"
              name="?"
              iconType="userAvatar"
              color={"#D3DAE6"}
            />
            <EuiText style={{ marginLeft: "1rem" }}>
              <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold", marginRight: "0.5em" }}>
                  Mensajero:{" "}
                </p>
                <Popover
                  isPopoverOpen={isPopoverOpen}
                  closePopover={() => setPopoverOpen(!isPopoverOpen)}
                  button={
                    <EuiLink onClick={() => setPopoverOpen(!isPopoverOpen)}>
                      No asignado
                    </EuiLink>
                  }
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {children}
                  </div>
                </Popover>
              </div>
            </EuiText>
          </EuiPanel>
          <EuiSpacer />
        </>
      ) : (
        <>
          <EuiPanel style={{ display: "flex" }} color="subdued">
            <EuiAvatar
              size="xl"
              name="Cat"
              imageUrl="https://source.unsplash.com/64x64/?cat"
            />
            <div style={{ marginLeft: "1rem" }}>
              <SimpleList title={"Id:"} description={`${messenger.id}`} />
              <SimpleList
                title={"Mensajero:"}
                description={`${messenger.firstName} ${messenger.lastName}`}
              />
              <SimpleList
                title={"Télefono:"}
                description={`${messenger.phone}`}
              />
            </div>
          </EuiPanel>
          <EuiSpacer />
        </>
      )}
    </>
  );
};
