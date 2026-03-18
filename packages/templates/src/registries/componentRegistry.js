import React from 'react';

import { CallToAction } from '../sections/CallToAction';
import { ComicPanels } from '../sections/ComicPanels';
import { ContentSection } from '../sections/ContentSection';
import { Footer } from '../sections/Footer';
import { Header } from '../sections/Header';
import { Hero } from '../sections/Hero';
import { ImageGrid } from '../sections/ImageGrid';
import { ItemGrid } from '../sections/ItemGrid';
import { Marquee } from '../sections/Marquee';
import { SpeechBubbleTestimonials } from '../sections/SpeechBubbleTestimonials';
import { StatsCounter } from '../sections/StatsCounter';
import { Terminal } from '../sections/Terminal';
import { TestimonialCards } from '../sections/TestimonialCards';
import {
  mapAlignToFlex,
  mapButtonProps,
  mapCardContentProps,
  mapCardProps,
  mapHeadingProps,
  mapLevel,
  mapSectionProps,
  mapSpeedToDuration,
  mapTextContentProps,
  unwrapArrayItems,
  unwrapNestedObjects,
  unwrapText,
} from '../utils/configMappers';

export const componentRegistry = {
  header: {
    component: Header,
    propsMapper: (config, templateConfig) => ({
      companyName: config.companyName,
      // Legacy logo support (if logo is a component, use it directly)
      logo:
        typeof config.logo === "object" && config.logo?.type
          ? undefined
          : config.logo,
      // New logo system
      logoType: config.logo?.type,
      logoText: config.logo?.text,
      logoUrl: config.logo?.url,
      logoWidth: config.logo?.width,
      logoHeight: config.logo?.height,
      backgroundColor: config.backgroundColor,
      logoColor: config.logoColor,
      linkColor: config.linkColor,
      // Use links from config if available, otherwise fall back to templateConfig
      links: config.links || templateConfig?.navLinks || [],
      padding: config.padding,
      shadow: config.shadow,
      logoLevel: mapLevel(config.titleLevel || config.logoLevel),
      linkGap: config.linkGap,
      maxWidth: config.maxWidth,
    }),
  },
  hero: {
    component: Hero,
    propsMapper: (config) => ({
      ...mapTextContentProps(config, "title"),
      ...mapTextContentProps(config, "subtitle"),
      ...mapButtonProps(config),
      ...mapSectionProps(config),
      titleLevel: mapLevel(config.titleLevel),
      gradientStart: config.gradientStart,
      gradientEnd: config.gradientEnd,
      gradientAngle:
        typeof config.gradientAngle === "number"
          ? `${135 + config.gradientAngle}deg`
          : config.gradientAngle,
    }),
  },
  features: {
    component: ItemGrid,
    propsMapper: (config) => ({
      ...mapHeadingProps(config),
      ...mapSectionProps(config),
      ...mapCardProps(config),
      ...mapCardContentProps(config),
      items: unwrapArrayItems(config.items, ["title", "content"]),
      columns: config.columns,
      renderItem: config.renderItem,
    }),
  },
  projects: {
    component: ItemGrid,
    propsMapper: (config) => ({
      ...mapHeadingProps(config),
      ...mapSectionProps(config),
      ...mapCardProps(config),
      ...mapCardContentProps(config),
      items: unwrapArrayItems(config.items, [
        "title",
        "content",
        "description",
      ]),
      columns: config.columns,
      renderItem: config.renderItem,
    }),
  },
  about: {
    component: ContentSection,
    propsMapper: (config) => ({
      ...mapHeadingProps(config),
      ...mapTextContentProps(config, "content"),
      ...mapSectionProps(config),
      contentMaxWidth: config.content?.maxWidth,
      contentAlign: mapAlignToFlex(config.content?.align),
      textColor: config.content?.color || config.textColor,
    }),
  },
  cta: {
    component: CallToAction,
    propsMapper: (config) => ({
      ...mapTextContentProps(config, "title"),
      ...mapTextContentProps(config, "subtitle"),
      ...mapButtonProps(config),
      ...mapSectionProps(config),
      // Handle alt naming
      title: unwrapText(config.title?.text || config.title || config.heading),
      subtitle: unwrapText(
        config.subtitle?.text || config.subtitle || config.subheading,
      ),
    }),
  },
  footer: {
    component: Footer,
    propsMapper: (config) => ({
      ...mapTextContentProps(config, "text"),
      ...mapSectionProps(config),
      textDecoration: config.text?.decoration,
      textAlign: config.align,
      flexAlign: mapAlignToFlex(config.align),
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
      ...mapHeadingProps(config),
      ...mapSectionProps(config),
      ...mapCardProps(config),
      ...mapCardContentProps(config),
      panels: unwrapArrayItems(config.panels, ["title", "content"]),
      columns: config.columns,
      renderPanel: config.renderPanel,
    }),
  },
  testimonials: {
    component: (props) => {
      const hasAvatar = props.quotes?.[0]?.avatar;
      const Component = hasAvatar ? SpeechBubbleTestimonials : TestimonialCards;
      return React.createElement(Component, props);
    },
    propsMapper: (config) => ({
      ...mapTextContentProps(config, "title"),
      ...mapSectionProps(config),
      ...mapCardProps(config),
      ...mapCardContentProps(config),
      quotes: unwrapArrayItems(config.quotes, ["title", "content", "avatar"]),
      columns: config.columns,
      cardAlign: mapAlignToFlex(config.card?.align),
    }),
  },
  // Cyberpunk Components
  terminal: {
    component: Terminal,
    propsMapper: (config) => {
      // Migrate old 'lines' structure to new 'commands' structure
      const commands =
        config.commands?.map((cmd) => ({
          promptText: unwrapText(cmd.prompt),
          promptColor: cmd.prompt?.color,
          promptSize: cmd.prompt?.size,
          promptWeight: cmd.prompt?.weight,
          responseText: unwrapText(cmd.response),
          responseColor: cmd.response?.color,
          responseSize: cmd.response?.size,
          responseWeight: cmd.response?.weight,
        })) ||
        config.lines?.map((line) => ({
          promptText: line.text || line.prompt || "",
          responseText: line.response || "",
        })) ||
        [];

      return {
        ...mapHeadingProps(config),
        commands,
        backgroundColor: config.backgroundColor,
        promptColor: config.promptColor || config.textColor,
        responseColor: config.responseColor || config.accentColor,
        windowBgColor: config.window?.backgroundColor || config.windowBgColor,
        windowPadding: config.window?.padding,
        windowBorderRadius: config.window?.borderRadius,
        windowDropShadow: config.window?.dropShadow,
        windowBorderWidth: config.window?.borderWidth,
        windowBorderColor: config.window?.borderColor,
        padding: config.padding,
        headingLevel: mapLevel(config.headingLevel),
        showHeader: config.showHeader,
        maxWidth: config.maxWidth,
      };
    },
  },
  stats: {
    component: StatsCounter,
    propsMapper: (config) => {
      // Handle both flat structure (futuristicTech) and nested structure (refinedClassic)
      const titleProps =
        config.title &&
        typeof config.title === "object" &&
        "text" in config.title
          ? {
              title: unwrapText(config.title),
              titleSize: config.title.size,
              titleWeight: config.title.weight,
              titleColor: config.title.color,
            }
          : {
              title: unwrapText(config.title) || "",
              titleSize: config.titleSize,
              titleWeight: config.titleWeight,
              titleColor: config.titleColor,
            };

      return {
        ...titleProps,
        ...mapSectionProps(config),
        ...mapCardProps(config),
        cardTitleSize: config.cardTitleSize || config.card?.title?.size,
        cardTitleWeight: config.cardTitleWeight || config.card?.title?.weight,
        cardTitleColor: config.cardTitleColor || config.card?.title?.color,
        cardContentSize: config.cardContentSize || config.card?.content?.size,
        cardContentWeight:
          config.cardContentWeight || config.card?.content?.weight,
        cardContentColor:
          config.cardContentColor || config.card?.content?.color,
        items: unwrapArrayItems(config.items, ["title", "content"]),
        columns: config.columns,
      };
    },
  },
  // Swiss Brutalist Components
  imageGrid: {
    component: ImageGrid,
    propsMapper: (config) => ({
      ...mapHeadingProps(config),
      ...mapSectionProps(config),
      images: unwrapArrayItems(config.images, ["caption"]),
      columns: config.columns,
      imageHeight: config.imageHeight,
      renderImage: config.renderImage,
      // Card/Image props
      cardBackgroundColor:
        config.image?.backgroundColor || config.card?.backgroundColor,
      cardPadding: config.image?.padding || config.card?.padding,
      cardBorderRadius: config.image?.borderRadius || config.card?.borderRadius,
      cardDropShadow: config.image?.dropShadow || config.card?.dropShadow,
      // Image props
      imageUrl: config.image?.image?.url,
      imageAlt: config.image?.image?.alt,
      imageFit: config.image?.image?.fit,
      imageAspectRatio: config.image?.image?.aspectRatio,
      // Caption props
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
      headingLevel: mapLevel(config.headingLevel),
      imageHeight: config.imageHeight,
      maxWidth: config.maxWidth,
      renderImage: config.renderImage,
    }),
  },
  portfolio: {
    component: ImageGrid,
    propsMapper: (config) => ({
      ...mapHeadingProps(config),
      ...mapSectionProps(config),
      images: unwrapArrayItems(config.images, ["caption"]),
      columns: config.columns,
      imageHeight: config.imageHeight,
      renderImage: config.renderImage,
      // Image props from config.image schema
      cardBackgroundColor: config.image?.backgroundColor,
      cardPadding: config.image?.padding,
      cardBorderRadius: config.image?.borderRadius,
      cardDropShadow: config.image?.dropShadow,
      imageUrl: config.image?.image?.url,
      imageAlt: config.image?.image?.alt,
      imageFit: config.image?.image?.fit,
      imageAspectRatio: config.image?.image?.aspectRatio,
      captionText: unwrapText(config.image?.caption),
      captionSize: config.image?.caption?.size,
      captionWeight: config.image?.caption?.weight,
      captionColor: config.image?.caption?.color,
      captionTextAlign: config.image?.caption?.textAlign,
      captionBackgroundColor: config.image?.caption?.backgroundColor,
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
      headingLevel: mapLevel(config.headingLevel),
      valueLevel: config.valueLevel,
      align: mapAlignToFlex(config.align),
      maxWidth: config.maxWidth,
      renderStat: config.renderStat,
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

  try {
    const props = propsMapper(config, templateConfig);

    // Add dataElement prop to make the section selectable
    props.dataElement = elementType;

    return { component, props };
  } catch (error) {
    console.error(`Error mapping props for component: ${elementType}`, error);

    if (process.env.NODE_ENV === "development") {
      console.error("Component config:", config);
      console.error("Template config:", templateConfig);
    }

    return null;
  }
};
