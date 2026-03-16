export const unwrapText = (value) => {
  if (value && typeof value === "object" && "text" in value) {
    return value.text;
  }
  return value;
};

export const mapLevel = (level) =>
  typeof level === "string" ? Number(level) : level;

export const mapAlignToFlex = (align) => {
  const alignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };
  return alignMap[align] || align;
};

export const mapSpeedToDuration = (speed) => {
  const speedMap = {
    slow: "30s",
    medium: "20s",
    fast: "10s",
  };
  return speedMap[speed] || speed;
};

export const mapSectionProps = (config) => ({
  backgroundColor: config.backgroundColor,
  padding: config.padding,
  maxWidth: config.maxWidth,
  align: mapAlignToFlex(config.align),
  gap: config.gap,
});

export const mapHeadingProps = (config, key = "heading") => {
  const heading = config[key];
  return {
    [key]: unwrapText(heading?.text || heading),
    [`${key}Size`]: heading?.size,
    [`${key}Weight`]: heading?.weight,
    [`${key}Color`]: heading?.color,
    [`${key}Level`]: mapLevel(config[`${key}Level`]),
  };
};

export const mapTextContentProps = (config, key) => {
  const content = config[key];
  return {
    [key]: unwrapText(content?.text || content),
    [`${key}Size`]: content?.size,
    [`${key}Weight`]: content?.weight,
    [`${key}Color`]: content?.color,
  };
};

export const mapButtonProps = (config) => ({
  buttonText: unwrapText(
    config.button?.text ||
      config.button ||
      config.buttonText ||
      config.ctaButtonText,
  ),
  buttonUrl: config.button?.url || config.buttonUrl,
  buttonColor:
    config.button?.color || config.buttonColor || config.ctaButtonColor,
  buttonTextColor: config.button?.textColor || config.buttonTextColor,
  buttonSize: config.button?.size || config.buttonSize,
  buttonBorderRadius: config.button?.borderRadius || config.buttonBorderRadius,
  buttonVariant: config.buttonVariant,
});

export const mapCardProps = (config) => ({
  cardBackgroundColor: config.card?.backgroundColor,
  cardPadding: config.card?.padding,
  cardGap: config.card?.gap,
  cardAlign: config.card?.align || mapAlignToFlex(config.card?.align),
  cardBorderRadius: config.card?.borderRadius,
  cardBorderWidth: config.card?.borderWidth,
  cardBorderColor: config.card?.borderColor,
  cardDropShadow: config.card?.dropShadow,
});

export const mapCardContentProps = (config) => ({
  cardTitleSize: config.card?.title?.size,
  cardTitleWeight: config.card?.title?.weight,
  cardTitleColor: config.card?.title?.color,
  cardContentSize: config.card?.content?.size,
  cardContentWeight: config.card?.content?.weight,
  cardContentColor: config.card?.content?.color,
  cardAvatarSize: config.card?.avatar?.size,
  cardAvatarBackgroundColor: config.card?.avatar?.backgroundColor,
});

export const unwrapNestedObjects = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(unwrapNestedObjects);
  }
  if (obj && typeof obj === "object") {
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      if (
        [
          "title",
          "content",
          "text",
          "icon",
          "button",
          "avatar",
          "caption",
          "label",
          "description",
          "author",
        ].includes(key)
      ) {
        unwrapped[key] = unwrapText(value);
      } else {
        unwrapped[key] = value;
      }
    }
    return unwrapped;
  }
  return obj;
};

export const unwrapArrayItems = (items, propsToUnwrap = []) => {
  if (!Array.isArray(items)) return items;

  return items.map((item) => {
    const unwrapped = { ...item };

    propsToUnwrap.forEach((propName) => {
      const propValue = item[propName];

      if (propValue && typeof propValue === "object") {
        if ("text" in propValue) {
          unwrapped[propName] = propValue.text;

          Object.keys(propValue).forEach((key) => {
            if (key !== "text") {
              const capitalizedKey =
                propName + key.charAt(0).toUpperCase() + key.slice(1);
              unwrapped[capitalizedKey] = propValue[key];
            }
          });
        }
      }
    });

    return unwrapped;
  });
};
