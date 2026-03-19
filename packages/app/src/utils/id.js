/**
 * ID Generation Utilities
 *
 * Centralized utilities for generating unique identifiers using UUID v4.
 * Provides consistent ID generation patterns across the application.
 */

import { v4 as uuidv4 } from "uuid";

/**
 * Generate a UUID v4 identifier
 * @returns {string} UUID v4 string (e.g., "550e8400-e29b-41d4-a716-446655440000")
 * @example
 * const id = generateId();
 * // => "550e8400-e29b-41d4-a716-446655440000"
 */
export const generateId = () => uuidv4();

/**
 * Generate a short ID (first 8 characters of UUID)
 * Useful for display purposes or when full UUID is too long
 * @returns {string} Short ID (8 characters)
 * @example
 * const shortId = generateShortId();
 * // => "550e8400"
 */
export const generateShortId = () => uuidv4().split("-")[0];

/**
 * Validate if a string is a valid UUID v4
 * @param {string} id - The ID to validate
 * @returns {boolean} True if valid UUID v4, false otherwise
 * @example
 * isValidUUID("550e8400-e29b-41d4-a716-446655440000"); // => true
 * isValidUUID("invalid-id"); // => false
 */
export const isValidUUID = (id) => {
  if (!id || typeof id !== "string") return false;

  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

/**
 * Generate a UUID with a custom prefix
 * Useful for categorizing different types of IDs
 * @param {string} prefix - The prefix to add before the UUID
 * @returns {string} Prefixed UUID (e.g., "modal-550e8400-e29b-41d4-a716-446655440000")
 * @example
 * generatePrefixedId("modal"); // => "modal-550e8400-e29b-41d4-a716-446655440000"
 * generatePrefixedId("session"); // => "session-123e4567-e89b-12d3-a456-426614174000"
 */
export const generatePrefixedId = (prefix) => `${prefix}-${uuidv4()}`;

/**
 * Generate a modal-specific ID
 * @returns {string} Prefixed modal ID
 * @example
 * const modalId = generateModalId();
 * // => "modal-550e8400-e29b-41d4-a716-446655440000"
 */
export const generateModalId = () => generatePrefixedId("modal");

/**
 * Generate a history entry ID
 * @returns {string} Prefixed history ID
 * @example
 * const historyId = generateHistoryId();
 * // => "history-550e8400-e29b-41d4-a716-446655440000"
 */
export const generateHistoryId = () => generatePrefixedId("history");

/**
 * Generate a session ID
 * @returns {string} Prefixed session ID
 * @example
 * const sessionId = generateSessionId();
 * // => "session-550e8400-e29b-41d4-a716-446655440000"
 */
export const generateSessionId = () => generatePrefixedId("session");

/**
 * Generate an export ID
 * @returns {string} Prefixed export ID
 * @example
 * const exportId = generateExportId();
 * // => "export-550e8400-e29b-41d4-a716-446655440000"
 */
export const generateExportId = () => generatePrefixedId("export");

/**
 * Generate an analytics event ID
 * @returns {string} Prefixed event ID
 * @example
 * const eventId = generateEventId();
 * // => "event-550e8400-e29b-41d4-a716-446655440000"
 */
export const generateEventId = () => generatePrefixedId("event");

/**
 * Extract the UUID part from a prefixed ID
 * @param {string} prefixedId - The prefixed ID (e.g., "modal-550e8400-...")
 * @returns {string|null} The UUID part or null if invalid format
 * @example
 * extractUUID("modal-550e8400-e29b-41d4-a716-446655440000");
 * // => "550e8400-e29b-41d4-a716-446655440000"
 */
export const extractUUID = (prefixedId) => {
  if (!prefixedId || typeof prefixedId !== "string") return null;

  const parts = prefixedId.split("-");
  if (parts.length < 6) return null;

  // Remove first part (prefix) and rejoin
  const uuid = parts.slice(1).join("-");
  return isValidUUID(uuid) ? uuid : null;
};

/**
 * Extract the prefix from a prefixed ID
 * @param {string} prefixedId - The prefixed ID (e.g., "modal-550e8400-...")
 * @returns {string|null} The prefix or null if invalid format
 * @example
 * extractPrefix("modal-550e8400-e29b-41d4-a716-446655440000");
 * // => "modal"
 */
export const extractPrefix = (prefixedId) => {
  if (!prefixedId || typeof prefixedId !== "string") return null;

  const firstDashIndex = prefixedId.indexOf("-");
  if (firstDashIndex === -1) return null;

  return prefixedId.substring(0, firstDashIndex);
};

/**
 * Check if an ID has a specific prefix
 * @param {string} id - The ID to check
 * @param {string} prefix - The expected prefix
 * @returns {boolean} True if ID has the specified prefix
 * @example
 * hasPrefix("modal-550e8400-e29b-41d4-a716-446655440000", "modal"); // => true
 * hasPrefix("modal-550e8400-e29b-41d4-a716-446655440000", "session"); // => false
 */
export const hasPrefix = (id, prefix) => {
  return extractPrefix(id) === prefix;
};
