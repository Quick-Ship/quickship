import {
  EuiButton,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui";

export interface ModalProps {
  onCloseModal: () => void;
  children: React.ReactNode;
  titleModal: string;
}

export const Modal: React.FC<ModalProps> = ({
  onCloseModal,
  children,
  titleModal,
}) => {
  return (
    <EuiModal onClose={onCloseModal}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{titleModal}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>{children}</EuiModalBody>
    </EuiModal>
  );
};
