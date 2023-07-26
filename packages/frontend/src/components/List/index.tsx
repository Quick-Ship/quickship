import { EuiText } from "@elastic/eui";

interface SimpleListProps {
  title: string;
  description: string;
}

export const SimpleList: React.FC<SimpleListProps> = ({
  description,
  title,
}) => {
  return (
    <EuiText>
      <p>
        <span style={{ fontWeight: "bold" }}>{title} </span> {description}
      </p>
    </EuiText>
  );
};
