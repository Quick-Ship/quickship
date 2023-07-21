import {
  EuiFocusTrap,
  EuiLoadingSpinner,
  EuiOverlayMask,
} from "@elastic/eui";

export const LoadingPage = () => {
  return (
    <EuiOverlayMask>
      <EuiFocusTrap>
        <EuiLoadingSpinner size="xxl" />
      </EuiFocusTrap>
    </EuiOverlayMask>
  );
};
