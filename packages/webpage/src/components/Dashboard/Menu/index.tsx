import Image from "next/image";
import Link from 'next/link'

interface DashboardButtonListProps {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  title: string;
  icon: string;
  // href: string;
}

export const ButtonList: React.FC<DashboardButtonListProps> = ({
  onClick,
  title,
  icon,
  // href,
}) => {
  return (
    <div
      className="p-4 bg-blue-100 flex w-full items-center hover:bg-blue-200 active:bg-blue-100 mt-1 rounded"
      // onClick={onClick}
      // href={href}
      onClick={onClick}
    >
      <Image
        src={`/${icon}`}
        alt="init"
        className=""
        width={27}
        height={27}
        priority
      />
      <div className="pl-4 text-lg font-medium">{title}</div>
    </div>
  );
};
