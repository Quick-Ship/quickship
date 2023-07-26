import {
  EuiSpacer,
  EuiTabbedContent,
  EuiTabbedContentTab,
  EuiToast,
} from "@elastic/eui";

export interface TabsProps {
  tabs: EuiTabbedContentTab[];
  color?: "primary" | "success" | "warning" | "danger" | undefined;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, color }) => {
  return (
    <>
      <EuiToast title="" color={color}>
        <EuiTabbedContent tabs={tabs} initialSelectedTab={tabs[0]} />
      </EuiToast>
      <EuiSpacer />
    </>
  );
};
