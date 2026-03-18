/**
 * Component Property Registry
 *
 * Defines standard editable properties for each primitive UI component.
 * This makes the editor generic and consistent across all templates.
 */


import { COMPONENT_PROPERTIES } from '@/constants/componentProperties';


/**
 * Get properties for a component type
 */
export function getComponentProperties(elementId) {
  if (!elementId) return null;

  // Extract component type from element ID
  // e.g., "hero.title" -> "title"
  // e.g., "testimonialCards.card-0" -> "card"
  // e.g., "hero" -> "hero" (section level)

  const parts = elementId.split(".");
  const lastPart = parts[parts.length - 1];

  // Check if it's a numbered item (e.g., "card-0", "item-2")
  const itemMatch = lastPart.match(/^([a-z]+)-\d+$/);
  const componentType = itemMatch ? itemMatch[1] : lastPart;

  return COMPONENT_PROPERTIES[componentType] || null;
}

/**
 * Check if element is a section (top-level component)
 */
export function isSection(elementId) {
  return elementId && !elementId.includes(".");
}

/**
 * Get parent element ID
 */
export function getParentElementId(elementId) {
  if (!elementId || !elementId.includes(".")) return null;
  const parts = elementId.split(".");
  parts.pop();
  return parts.join(".");
}
