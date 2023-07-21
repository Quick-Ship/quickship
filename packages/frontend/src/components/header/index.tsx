import {
  EuiButton,
  EuiHeaderSectionItem,
  EuiPageHeader,
  EuiText,
} from "@elastic/eui";

export interface HeaderProps {
  title: string;
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  children,
}: HeaderProps) => {
  return (
    <EuiPageHeader>
      <EuiHeaderSectionItem border="right">
        <EuiText>
          <h2>{title}</h2>
        </EuiText>
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>{children}</EuiHeaderSectionItem>
    </EuiPageHeader>
  );
};
