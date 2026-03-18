export const getNestedValue = (obj, path) => {
  return path.split(".").reduce((current, key) => current?.[key], obj);
};

export const setNestedValue = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const target = keys.reduce((current, key) => {
    // If the key doesn't exist, create an empty object
    if (!current[key]) {
      current[key] = {};
    }
    // If the current value is a primitive (string, number, etc.) but we need to go deeper,
    // convert it to an object and preserve the primitive as "text"
    else if (typeof current[key] !== "object" || current[key] === null) {
      const oldValue = current[key];
      current[key] = { text: oldValue };
    }
    return current[key];
  }, obj);
  target[lastKey] = value;
  return obj;
};

export const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};
