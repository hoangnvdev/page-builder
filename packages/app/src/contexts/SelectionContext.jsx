import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const SelectionContext = createContext(null);

export const SelectionProvider = ({ children }) => {
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedSubElement, setSelectedSubElement] = useState(null);
  const selectedTemplate = useSelector(
    (state) => state.builder.selectedTemplate,
  );

  // Reset selection when template changes
  useEffect(() => {
    setSelectedElement(null);
    setSelectedSubElement(null);
  }, [selectedTemplate?.id]);

  const selectElement = useCallback((elementId) => {
    // Check if this is a nested element (e.g., "hero.title", "header.companyName")
    if (elementId && elementId.includes(".")) {
      const parts = elementId.split(".");
      setSelectedElement(parts[0]); // e.g., "hero"
      setSelectedSubElement(elementId); // e.g., "hero.title"
    } else {
      // Top-level element selection (just section)
      setSelectedElement(elementId);
      setSelectedSubElement(null);
    }
  }, []);

  const deselectElement = useCallback(() => {
    setSelectedElement(null);
    setSelectedSubElement(null);
  }, []);

  const value = {
    selectedElement,
    selectedSubElement,
    selectElement,
    deselectElement,
  };

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  );
};

SelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSelection = () => {
  const context = useContext(SelectionContext);
  if (!context) {
    throw new Error("useSelection must be used within SelectionProvider");
  }
  return context;
};
