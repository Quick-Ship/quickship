interface ButtonProps {
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  color?: string;
  outlined?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onClick,
  color,
  outlined,
}) => {
  const ACTIVEBUTTON =
    "shadow-xl active:translate-y-1  active:scale-100 duration-300";

  const CONTAINED = `p-3 rounded-lg w-64 bg-[${color}] active:bg-[#9cccc3]  ${ACTIVEBUTTON}`;

  const OUTLINED = `p-3 rounded-lg border border-4 w-64 border-[${color}] active:bg-[#eaf5f3]  bg-[#def0ee] ${ACTIVEBUTTON}`;

  return (
    <button className={outlined ? OUTLINED : CONTAINED} onClick={onClick}>
      {title}
    </button>
  );
};
