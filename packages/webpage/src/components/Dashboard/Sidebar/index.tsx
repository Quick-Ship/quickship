import { ButtonList } from "@/components";
import Image from "next/image";

interface DashboardSidebarProps {
  children: React.ReactNode;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  children,
}) => {
  return (
    <div className="flex">
      <div className="w-56 bg-green-100">
        <div className="h-32 pl-4 bg-blue-100 flex w-full items-center">
          <Image
            src="/circle-user-regular.svg"
            alt="init"
            className=""
            width={50}
            height={50}
            priority
          />
          <div className="pl-3">
            <p className="text-base font-semibold font-sans">Quik Ship</p>
            <p className="text-base font-normal font-sans">Cliente Uno</p>
          </div>
        </div>
        <ButtonList
          href={"/dashboard/createshipment"}
          title={"Crear envió"}
          icon={"car-side.svg"}
        />
        <ButtonList
          href={"/dashboard/shipments"}
          title={"Mis envios"}
          icon={"square-poll.svg"}
        />
        <ButtonList
          href={"/dashboard/trackshipment"}
          title={"Rastrear mi envio"}
          icon={"map-pin.svg"}
        />
        <ButtonList
          href={"/dashboard/balance"}
          title={"Saldo"}
          icon={"sack-dollar.svg"}
        />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};
