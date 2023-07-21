import { EuiHeader, EuiHeaderLogo, EuiHeaderSectionItem } from "@elastic/eui";

export interface NavbarProps {
  onClick: (event: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  return (
    <EuiHeader>
      <EuiHeaderSectionItem border="right">
        <EuiHeaderLogo iconType="menu" onClick={onClick}></EuiHeaderLogo>
      </EuiHeaderSectionItem>

      <EuiHeaderSectionItem>
        <EuiHeaderLogo iconType="help"></EuiHeaderLogo>
        <EuiHeaderLogo iconType="user"></EuiHeaderLogo>
      </EuiHeaderSectionItem>
    </EuiHeader>
  );
};
