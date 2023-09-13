import Image from "next/image";
import Link from "next/link";

interface ButtonListProps {
  title: string;
  icon: string;
  href: string;
}

export const ButtonList: React.FC<ButtonListProps> = ({
  icon,
  title,
  href,
}) => {
  return (
    <Link
      className="p-4 bg-blue-100 flex w-full items-center hover:bg-blue-200 active:bg-blue-100"
      href={href}
    >
      <Image
        src={`/${icon}`}
        alt="init"
        className=""
        width={27}
        height={27}
        priority
      />
      <p className="pl-4 text-lg font-medium">{title}</p>
    </Link>
  );
};
