import {
  useCallback,
  useState,
} from 'react';

export const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    variant: "warning",
    onConfirm: () => {},
  });

  const showConfirm = useCallback(
    ({
      title,
      message,
      confirmText,
      cancelText,
      variant = "warning",
      onConfirm,
    }) => {
      setConfig({
        title,
        message,
        confirmText,
        cancelText,
        variant,
        onConfirm,
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
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    config,
    showConfirm,
    handleConfirm,
    handleCancel,
  };
};
