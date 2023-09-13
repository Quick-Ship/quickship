interface LinkProps {
  href: string | undefined;
  title: string;
}

export const Link: React.FC<LinkProps> = ({ href, title }) => {
  return (
    <a
      href={href}
      className="border border-blue-500 p-4 cursor-pointer text-white font-bold underline underline-offset-4 rounded-lg w-72 flex justify-center bg-blue-500 shadow-2xl active:bg-blue-500 hover:bg-blue-600"
    >
      <span className="text-lg">{title}</span>
    </a>
  );
};
