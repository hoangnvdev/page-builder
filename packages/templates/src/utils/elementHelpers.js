/**
 * Convert element ID from 0-based to 1-based indexing for display purposes
 * Example: "imageGrid.images.0.image" → "imageGrid.images.1.image"
 * @param {string} elementId - The element ID with 0-based array indices
 * @returns {string} - The element ID with 1-based array indices
 */
export const formatElementIdForDisplay = (elementId) => {
  if (!elementId) return elementId;

  return elementId.replace(/\.(\d+)(\.|\b)/g, (match, index, separator) => {
    const oneBasedIndex = parseInt(index, 10) + 1;
    return `.${oneBasedIndex}${separator}`;
  });
};

/**
 * Format a human-readable label from an element ID with proper capitalization
 * and 1-based array indexing. This function is used to generate user-friendly
 * labels in the PropertyPanel header.
 *
 * Example transformations:
 * - "imageGrid.images.0.image" → "Image Grid Image 1 Image"
 * - "hero.buttons.2" → "Hero Button 3"
 * - "testimonials.quotes.1.title" → "Testimonials Quote 2 Title"
 *
 * @param {string} label - The raw label from schema (may be ignored if elementId has index)
 * @param {string} elementId - The element ID path (e.g., "section.array.0.property")
 * @param {Function} getSingularTemplateName - Function to convert plural to singular (e.g., "images" → "image")
 * @returns {string} - Formatted, human-readable label with 1-based indices
 */
export const formatElementLabel = (
  label,
  elementId,
  getSingularTemplateName,
) => {
  const parts = elementId.split(".");

  // Check if this is selecting an array item (has a numeric index in the path)
  const arrayIndexPos = parts.findIndex((part) => /^\d+$/.test(part));

  if (arrayIndexPos !== -1) {
    // This is an array item selection
    const arrayIndex = parseInt(parts[arrayIndexPos], 10);
    const sectionName = parts[0]; // e.g., "imageGrid"

    // Format the section name properly
    const formattedSection = sectionName
      .replace(/([A-Z])/g, " $1")
      .trim()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    // Get the array name if there's a sub-path before the index
    if (arrayIndexPos > 1) {
      const arrayName = parts[arrayIndexPos - 1];
      // Convert to singular and capitalize
      const singularName = getSingularTemplateName(arrayName);
      const formattedArrayName = singularName
        .replace(/([A-Z])/g, " $1")
        .trim()
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      // Convert to 1-based index
      const displayIndex = arrayIndex + 1;

      // If there are more parts after the index, it's a nested property
      if (arrayIndexPos + 1 < parts.length) {
        const propertyName = parts.slice(arrayIndexPos + 1).join(" ");
        const formattedProperty = propertyName
          .replace(/([A-Z])/g, " $1")
          .trim()
          .split(" ")
          .map(
            (word) =>
              word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
          )
          .join(" ");
        return `${formattedSection} ${formattedArrayName} ${displayIndex} ${formattedProperty}`;
      }

      return `${formattedSection} ${formattedArrayName} ${displayIndex}`;
    }

    // Just section and index (e.g., "hero.0")
    // Convert to 1-based index
    const displayIndex = arrayIndex + 1;
    return `${formattedSection} Item ${displayIndex}`;
  }

  // No array index - check if label looks malformed (contains spaces followed by numbers)
  if (label && /\s+\d+$/.test(label)) {
    // Label ends with a number (like "Image 0"), keep it as is
    return label;
  }

  return label;
};
