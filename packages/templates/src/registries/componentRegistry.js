import React from "react";

import { CallToAction } from "../components/CallToAction";
import { ComicPanels } from "../components/ComicPanels";
import { ContentSection } from "../components/ContentSection";
import { DataStream } from "../components/DataStream";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ImageGrid } from "../components/ImageGrid";
import { ItemGrid } from "../components/ItemGrid";
import { Marquee } from "../components/Marquee";
import { QuoteBlock } from "../components/QuoteBlock";
import { SpeechBubbleTestimonials } from "../components/SpeechBubbleTestimonials";
import { SplitScreen } from "../components/SplitScreen";
import { StatsCounter } from "../components/StatsCounter";
import { TechSpecs } from "../components/TechSpecs";
import { Terminal } from "../components/Terminal";
import { TestimonialCards } from "../components/TestimonialCards";
import { Timeline } from "../components/Timeline";

/**
 * Helper function to unwrap nested config objects.
 * If value is an object with a 'text' property, return the text.
 * Otherwise return the value as-is.
 */
const unwrapText = (value) => {
  if (value && typeof value === "object" && "text" in value) {
    return value.text;
  }
  return value;
};

/**
 * Map text alignment values to flexbox alignment values
 * @param {string} align - Text alignment value (left, center, right)
 * @returns {string} Flexbox alignment value (flex-start, center, flex-end)
 */
const mapAlignToFlex = (align) => {
  const alignMap = {
    left: "flex-start",
    center: "center",
    right: "flex-end",
  };
  return alignMap[align] || align;
};

/**
 * Map animation speed labels to CSS duration values
 * @param {string} speed - Speed label (slow, medium, fast)
 * @returns {string} CSS duration value (30s, 20s, 10s)
 */
const mapSpeedToDuration = (speed) => {
  const speedMap = {
    slow: "30s",
    medium: "20s",
    fast: "10s",
  };
  return speedMap[speed] || speed;
};

/**
 * Recursively unwrap nested objects in an array or object.
 * Transforms structures like {text: "...", fontSize: "..."} to just the text value.
 */
const unwrapNestedObjects = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(unwrapNestedObjects);
  }
  if (obj && typeof obj === "object") {
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      // Special handling for known nested object fields that should be unwrapped to their text value
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

export const componentRegistry = {
  header: {
    component: Header,
    propsMapper: (config, templateConfig) => ({
      companyName: config.companyName,
      logo: config.logo,
      backgroundColor: config.backgroundColor,
      logoColor: config.logoColor,
      linkColor: config.linkColor,
      links: templateConfig?.navLinks || [],
      padding: config.padding,
      shadow: config.shadow,
      logoLevel:
        typeof config.logoLevel === "string"
          ? Number(config.logoLevel)
          : config.logoLevel,
      linkGap: config.linkGap,
      maxWidth: config.maxWidth,
    }),
  },
  hero: {
    component: Hero,
    propsMapper: (config) => ({
      title: config.title?.text || config.title,
      subtitle: config.subtitle?.text || config.subtitle,
      buttonText:
        config.button?.text || config.buttonText || config.ctaButtonText,
      backgroundColor: config.backgroundColor,
      gradientStart: config.gradientStart,
      gradientEnd: config.gradientEnd,
      gradientAngle: config.gradientAngle,
      titleColor: config.title?.color || config.titleColor,
      subtitleColor: config.subtitle?.color || config.subtitleColor,
      buttonColor:
        config.button?.color || config.buttonColor || config.ctaButtonColor,
      buttonTextColor: config.button?.textColor || config.buttonTextColor,
      padding: config.padding,
      align: mapAlignToFlex(config.align),
      titleLevel:
        typeof config.titleLevel === "string"
          ? Number(config.titleLevel)
          : config.titleLevel,
      maxWidth: config.maxWidth,
      gap: config.gap,
      titleSize: config.title?.size || config.titleSize,
      subtitleSize: config.subtitle?.size || config.subtitleSize,
      buttonSize: config.button?.size || config.buttonSize,
      buttonVariant: config.buttonVariant,
    }),
  },
  features: {
    component: ItemGrid,
    propsMapper: (config) => {
      return {
        heading: config.heading?.text || config.heading,
        headingSize: config.heading?.size,
        headingWeight: config.heading?.weight,
        headingColor: config.heading?.color,
        items: config.items, // Pass items directly without unwrapping
        backgroundColor: config.backgroundColor,
        columns: config.columns,
        gap: config.gap,
        padding: config.padding,
        headingLevel:
          typeof config.headingLevel === "string"
            ? Number(config.headingLevel)
            : config.headingLevel,
        align: mapAlignToFlex(config.align),
        maxWidth: config.maxWidth,
        // Card-level props as defaults
        cardBackgroundColor: config.card?.backgroundColor,
        cardPadding: config.card?.padding,
        cardAlign: config.card?.align,
        cardBorderRadius: config.card?.borderRadius,
        cardDropShadow: config.card?.dropShadow,
        // Card title props as defaults
        cardTitleSize: config.card?.title?.size,
        cardTitleWeight: config.card?.title?.weight,
        cardTitleColor: config.card?.title?.color,
        // Card content props as defaults
        cardContentSize: config.card?.content?.size,
        cardContentWeight: config.card?.content?.weight,
        cardContentColor: config.card?.content?.color,
        renderItem: config.renderItem,
      };
    },
  },
  projects: {
    component: ItemGrid,
    propsMapper: (config) => {
      const unwrappedItems = unwrapNestedObjects(config.items);
      const normalizedItems = unwrappedItems?.map((item) => ({
        ...item,
        description: item.description || item.content,
      }));

      return {
        heading: config.heading,
        items: normalizedItems,
        backgroundColor: config.backgroundColor,
        headingColor: config.headingColor,
        itemTitleColor: config.cardTitleColor,
        itemTextColor: config.cardTextColor,
        columns: config.columns || 3,
        gap: config.gap || "30px",
        padding: config.padding,
        headingLevel:
          typeof config.headingLevel === "string"
            ? Number(config.headingLevel)
            : config.headingLevel,
        headingAlign: config.headingAlign,
        maxWidth: config.maxWidth,
        renderItem: config.renderItem,
      };
    },
  },
  about: {
    component: ContentSection,
    propsMapper: (config) => ({
      heading: config.heading?.text || config.heading,
      headingSize: config.heading?.size,
      headingWeight: config.heading?.weight,
      content: config.content?.text || config.content,
      contentMaxWidth: config.content?.maxWidth,
      contentAlign: mapAlignToFlex(config.content?.align),
      headingColor: config.heading?.color || config.headingColor,
      textColor: config.content?.color || config.textColor,
      backgroundColor: config.backgroundColor,
      maxWidth: config.maxWidth,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      align: mapAlignToFlex(config.align),
      gap: config.gap,
    }),
  },
  cta: {
    component: CallToAction,
    propsMapper: (config) => ({
      // Title props
      title: unwrapText(config.title?.text || config.title || config.heading),
      titleSize: config.title?.size,
      titleWeight: config.title?.weight,
      titleColor: config.title?.color,

      // Subtitle props
      subtitle: unwrapText(
        config.subtitle?.text || config.subtitle || config.subheading,
      ),
      subtitleSize: config.subtitle?.size,
      subtitleColor: config.subtitle?.color,

      // Button props
      buttonText: unwrapText(
        config.button?.text || config.button || config.buttonText,
      ),
      buttonUrl: config.button?.url || config.buttonUrl,
      buttonColor: config.button?.color || config.buttonColor,
      buttonTextColor: config.button?.textColor || config.buttonTextColor,
      buttonSize: config.button?.size || config.buttonSize,

      // Section props
      backgroundColor: config.backgroundColor,
      padding: config.padding,
      align: mapAlignToFlex(config.align),
      maxWidth: config.maxWidth,
      gap: config.gap,
    }),
  },
  footer: {
    component: Footer,
    propsMapper: (config) => ({
      // Text props
      text: unwrapText(config.text?.text || config.text),
      textSize: config.text?.size,
      textWeight: config.text?.weight,
      textDecoration: config.text?.decoration,
      textColor: config.text?.color || config.textColor,

      // Section props
      backgroundColor: config.backgroundColor,
      padding: config.padding,
      textAlign: config.align, // Keep original for Text component
      flexAlign: mapAlignToFlex(config.align), // Map for Flex component
      maxWidth: config.maxWidth,
      links: config.links,
    }),
  },
  // Comic Splash Components
  marquee: {
    component: Marquee,
    propsMapper: (config) => ({
      text: config.text,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      padding: config.padding,
      textSize: config.textSize,
      textWeight: config.textWeight,
      speed: mapSpeedToDuration(config.speed),
      repeat: config.repeat || 3,
    }),
  },
  comicPanels: {
    component: ComicPanels,
    propsMapper: (config) => ({
      heading: config.heading?.text || config.heading,
      headingSize: config.heading?.size,
      headingWeight: config.heading?.weight,
      headingColor: config.heading?.color,
      panels: config.panels, // Pass panels directly without unwrapping
      columns: config.columns,
      gap: config.gap,
      backgroundColor: config.backgroundColor,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      maxWidth: config.maxWidth,
      align: mapAlignToFlex(config.align),
      // Card-level props as defaults
      cardBackgroundColor: config.card?.backgroundColor,
      cardPadding: config.card?.padding,
      cardAlign: config.card?.align,
      cardBorderRadius: config.card?.borderRadius,
      cardDropShadow: config.card?.dropShadow,
      // Card title props as defaults
      cardTitleSize: config.card?.title?.size,
      cardTitleWeight: config.card?.title?.weight,
      cardTitleColor: config.card?.title?.color,
      // Card content props as defaults
      cardContentSize: config.card?.content?.size,
      cardContentWeight: config.card?.content?.weight,
      cardContentColor: config.card?.content?.color,
      renderPanel: config.renderPanel,
    }),
  },
  testimonials: {
    component: (props) => {
      // Use SpeechBubbleTestimonials if quotes have avatars (Comic style)
      // Use TestimonialCards if quotes don't have avatars (Classic style)
      const hasAvatar = props.quotes?.[0]?.avatar;
      const Component = hasAvatar ? SpeechBubbleTestimonials : TestimonialCards;
      return React.createElement(Component, props);
    },
    propsMapper: (config) => {
      return {
        // Section-level title
        title: unwrapText(config.title?.text || config.title),
        titleSize: config.title?.size,
        titleWeight: config.title?.weight,
        titleColor: config.title?.color,

        // Section-level props
        backgroundColor: config.backgroundColor,
        columns: config.columns,
        gap: config.gap,
        padding: config.padding,
        align: mapAlignToFlex(config.align),
        maxWidth: config.maxWidth,

        // Card defaults
        cardBackgroundColor: config.card?.backgroundColor,
        cardPadding: config.card?.padding,
        cardAlign: mapAlignToFlex(config.card?.align),
        cardBorderRadius: config.card?.borderRadius,
        cardDropShadow: config.card?.dropShadow,

        // Card avatar defaults
        cardAvatarSize: config.card?.avatar?.size,
        cardAvatarBackgroundColor: config.card?.avatar?.backgroundColor,

        // Card title defaults (quote text)
        cardTitleSize: config.card?.title?.size,
        cardTitleWeight: config.card?.title?.weight,
        cardTitleColor: config.card?.title?.color,

        // Card content defaults (author)
        cardContentSize: config.card?.content?.size,
        cardContentWeight: config.card?.content?.weight,
        cardContentColor: config.card?.content?.color,

        // Pass quotes directly without unwrapping
        quotes: config.quotes,
      };
    },
  },
  // Cyberpunk Components
  terminal: {
    component: Terminal,
    propsMapper: (config) => {
      // Migrate old 'lines' structure to new 'commands' structure
      let commands = config.commands;
      if (!commands && config.lines) {
        commands = config.lines.map((line) => ({
          prompt: line.text || line.prompt || "",
          response: line.response || "",
        }));
      }
      return {
        heading: config.heading,
        commands,
        backgroundColor: config.backgroundColor,
        promptColor: config.promptColor || config.textColor,
        responseColor: config.responseColor || config.accentColor,
        windowBgColor: config.windowBgColor,
        padding: config.padding,
        headingLevel:
          typeof config.headingLevel === "string"
            ? Number(config.headingLevel)
            : config.headingLevel,
        showHeader: config.showHeader,
        maxWidth: config.maxWidth,
      };
    },
  },
  stats: {
    component: StatsCounter,
    propsMapper: (config) => {
      return {
        // Section-level title
        title: unwrapText(config.title?.text || config.title),
        titleSize: config.title?.size,
        titleWeight: config.title?.weight,
        titleColor: config.title?.color,

        // Section-level props
        backgroundColor: config.backgroundColor,
        columns: config.columns,
        gap: config.gap,
        padding: config.padding,
        align: mapAlignToFlex(config.align),
        maxWidth: config.maxWidth,

        // Card defaults
        cardBackgroundColor: config.card?.backgroundColor,
        cardPadding: config.card?.padding,
        cardAlign: mapAlignToFlex(config.card?.align),
        cardBorderRadius: config.card?.borderRadius,
        cardDropShadow: config.card?.dropShadow,

        // Card title defaults
        cardTitleSize: config.card?.title?.size,
        cardTitleWeight: config.card?.title?.weight,
        cardTitleColor: config.card?.title?.color,

        // Card content defaults
        cardContentSize: config.card?.content?.size,
        cardContentWeight: config.card?.content?.weight,
        cardContentColor: config.card?.content?.color,

        // Pass items directly without unwrapping
        items: config.items,
      };
    },
  },
  dataStream: {
    component: DataStream,
    propsMapper: (config) => ({
      heading: config.heading,
      lines: config.lines,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      gap: config.gap,
      animationDelay: config.animationDelay,
      fontFamily: config.fontFamily,
      maxWidth: config.maxWidth,
      renderLine: config.renderLine,
    }),
  },
  // Swiss Brutalist Components
  splitScreen: {
    component: SplitScreen,
    propsMapper: (config) => ({
      imagePosition: config.imagePosition,
      imageSrc: config.imageSrc,
      imagePlaceholder: config.imagePlaceholder,
      imageAlt: config.imageAlt,
      heading: config.heading,
      content: config.content,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      headingColor: config.headingColor,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      contentSize: config.contentSize,
      imageFit: config.imageFit,
      ratio: config.ratio,
      gap: config.gap,
      contentPadding: config.contentPadding,
      maxWidth: config.maxWidth,
    }),
  },
  quoteBlock: {
    component: QuoteBlock,
    propsMapper: (config) => ({
      quote: config.quote,
      author: config.author,
      backgroundColor: config.backgroundColor,
      quoteColor: config.quoteColor,
      dividerColor: config.dividerColor,
      quoteSize: config.quoteSize,
      maxWidth: config.maxWidth,
      padding: config.padding,
      gap: config.gap,
      dividerWidth: config.dividerWidth,
      showDivider: config.showDivider,
    }),
  },
  imageGrid: {
    component: ImageGrid,
    propsMapper: (config) => ({
      heading: unwrapText(config.heading),
      headingSize: config.heading?.size,
      headingWeight: config.heading?.weight,
      headingColor: config.heading?.color,
      images: unwrapNestedObjects(config.images),
      backgroundColor: config.backgroundColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      imageHeight: config.imageHeight,
      maxWidth: config.maxWidth,
      renderImage: config.renderImage,
      // Card defaults (with backward compatibility)
      cardBackgroundColor:
        config.image?.backgroundColor || config.card?.backgroundColor,
      cardPadding: config.image?.padding || config.card?.padding,
      cardBorderRadius: config.image?.borderRadius || config.card?.borderRadius,
      cardDropShadow: config.image?.dropShadow || config.card?.dropShadow,
      // Image defaults
      imageUrl: config.image?.image?.url,
      imageAlt: config.image?.image?.alt,
      imageFit: config.image?.image?.fit,
      imageAspectRatio: config.image?.image?.aspectRatio,
      // Caption defaults
      captionText: unwrapText(config.image?.caption),
      captionSize: config.image?.caption?.size,
      captionWeight: config.image?.caption?.weight,
      captionColor: config.image?.caption?.color,
      captionTextAlign: config.image?.caption?.textAlign,
      captionBackgroundColor: config.image?.caption?.backgroundColor,
    }),
  },
  gallery: {
    component: ImageGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      images: unwrapNestedObjects(config.images),
      backgroundColor: config.backgroundColor,
      columns: config.columns || 3,
      gap: config.gap,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      imageHeight: config.imageHeight,
      maxWidth: config.maxWidth,
      renderImage: config.renderImage,
    }),
  },
  // Classic Elegance & Sci-Fi Components
  timeline: {
    component: Timeline,
    propsMapper: (config) => ({
      heading: config.heading,
      milestones: config.milestones,
      backgroundColor: config.backgroundColor,
      lineColor: config.lineColor,
      dotColor: config.dotColor,
      lineWidth: config.lineWidth,
      dotSize: config.dotSize,
      itemGap: config.itemGap,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      titleLevel:
        typeof config.titleLevel === "string"
          ? Number(config.titleLevel)
          : config.titleLevel,
      maxWidth: config.maxWidth,
      renderItem: config.renderItem,
    }),
  },
  roadmap: {
    component: Timeline,
    propsMapper: (config) => ({
      heading: config.heading,
      phases: config.phases,
      backgroundColor: config.backgroundColor,
      lineColor: config.lineColor,
      dotColor: config.dotColor,
      lineWidth: config.lineWidth,
      dotSize: config.dotSize,
      itemGap: config.itemGap,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      titleLevel:
        typeof config.titleLevel === "string"
          ? Number(config.titleLevel)
          : config.titleLevel,
      maxWidth: config.maxWidth,
      renderItem: config.renderItem,
    }),
  },
  // Sci-Fi Tech Components
  metrics: {
    component: StatsCounter,
    propsMapper: (config) => ({
      heading: config.heading,
      stats: config.stats,
      backgroundColor: config.backgroundColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      valueLevel: config.valueLevel,
      align: mapAlignToFlex(config.align),
      maxWidth: config.maxWidth,
      renderStat: config.renderStat,
    }),
  },
  techSpecs: {
    component: TechSpecs,
    propsMapper: (config) => ({
      heading: config.heading,
      specs: config.specs,
      backgroundColor: config.backgroundColor,
      padding: config.padding,
      headingLevel:
        typeof config.headingLevel === "string"
          ? Number(config.headingLevel)
          : config.headingLevel,
      maxWidth: config.maxWidth,
      rowPadding: config.rowPadding,
      showDividers: config.showDividers,
      dividerColor: config.dividerColor,
      renderSpec: config.renderSpec,
    }),
  },
};

export const getComponentForElement = (elementType, config, templateConfig) => {
  const registration = componentRegistry[elementType];
  if (!registration) {
    console.warn(`No component registered for element type: ${elementType}`);
    return null;
  }

  const { component, propsMapper } = registration;
  const props = propsMapper(config, templateConfig);

  // Add dataElement prop to make the section selectable
  props.dataElement = elementType;

  return { component, props };
};
