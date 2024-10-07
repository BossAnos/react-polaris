import { Icon, Text } from "@shopify/polaris";
import { XIcon } from "@shopify/polaris-icons";
import "./modal.scss";

function Modal({ isOpen, children, onClose, title }) {
  if (!isOpen) return null;

  const handleOutSideClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-list" onClick={handleOutSideClick}>
      <div className="container popup-overlay" />
      <div className="modal-content">
        {title && (
          <div className="modal-header">
            <Text variant="headingMd" as="div">
              {" "}
              {title}
            </Text>

            <div className="close-icon" onClick={onClose}>
              <Icon source={XIcon} tone="base" />
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default Modal;
