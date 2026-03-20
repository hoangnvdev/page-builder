import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import PropTypes from 'prop-types';

import { ConfirmDialog } from '@/components';
import { generateModalId } from '@/utils';

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "",
    cancelText: "",
    variant: "warning",
    onConfirm: () => {},
    onCancel: () => {},
  });

  const [customModals, setCustomModals] = useState([]);

  const openConfirmDialog = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmDialog({
        isOpen: true,
        title: options.title || "Confirm Action",
        message: options.message || "Are you sure?",
        confirmText: options.confirmText,
        cancelText: options.cancelText,
        variant: options.variant || "warning",
        onConfirm: () => {
          options.onConfirm?.();
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          resolve(true);
        },
        onCancel: () => {
          options.onCancel?.();
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
          resolve(false);
        },
      });
    });
  }, []);

  const closeConfirmDialog = useCallback(() => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const openModal = useCallback((content, options = {}) => {
    // Auto-generate ID if not provided
    const modalId = options.id || generateModalId();

    setCustomModals((prev) => [
      ...prev,
      {
        id: modalId,
        content,
        isOpen: true,
        ...options,
      },
    ]);

    // Return ID for external reference
    return modalId;
  }, []);

  const closeModal = useCallback((id) => {
    setCustomModals((prev) =>
      prev.map((modal) =>
        modal.id === id ? { ...modal, isOpen: false } : modal,
      ),
    );

    // Remove modal from array after animation
    setTimeout(() => {
      setCustomModals((prev) => prev.filter((modal) => modal.id !== id));
    }, 300);
  }, []);

  const closeAllModals = useCallback(() => {
    setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
    setCustomModals([]);
  }, []);

  const value = useMemo(
    () => ({
      // Confirm dialog
      openConfirmDialog,
      closeConfirmDialog,
      confirmDialog,

      // Custom modals
      openModal,
      closeModal,
      closeAllModals,
      customModals,
    }),
    [
      openConfirmDialog,
      closeConfirmDialog,
      confirmDialog,
      openModal,
      closeModal,
      closeAllModals,
      customModals,
    ],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}

      {/* Render confirm dialog */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={confirmDialog.onCancel}
      />

      {/* Render custom modals */}
      {customModals.map((modal) => (
        <div key={modal.id}>{modal.content}</div>
      ))}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
