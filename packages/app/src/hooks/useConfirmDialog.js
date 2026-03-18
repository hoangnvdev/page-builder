import { useCallback, useState } from "react";

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    variant: "warning",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const showConfirm = useCallback(
    ({
      title,
      message,
      confirmText,
      cancelText,
      variant = "warning",
      onConfirm,
      onCancel,
    }) => {
      setConfig({
        title,
        message,
        confirmText,
        cancelText,
        variant,
        onConfirm,
        onCancel,
      });
      setIsOpen(true);
    },
    [],
  );

  const handleConfirm = useCallback(() => {
    config.onConfirm();
    setIsOpen(false);
  }, [config]);

  const handleCancel = useCallback(() => {
    if (config.onCancel) {
      config.onCancel();
    }
    setIsOpen(false);
  }, [config]);

  return {
    isOpen,
    config,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};
