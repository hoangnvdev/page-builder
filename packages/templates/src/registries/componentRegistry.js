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
} from "../utils/configMappers";

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
      logoLevel: mapLevel(config.logoLevel),
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
    propsMapper: (config) => {
      const unwrappedItems = unwrapArrayItems(config.items, [
        "title",
        "content",
        "description",
      ]);
      const normalizedItems = unwrappedItems?.map((item) => ({
        ...item,
        description: item.description || item.content,
      }));

      return {
        heading: unwrapText(config.heading),
        items: normalizedItems,
        backgroundColor: config.backgroundColor,
        headingColor: config.headingColor,
        itemTitleColor: config.cardTitleColor,
        itemTextColor: config.cardTextColor,
        columns: config.columns || 3,
        gap: config.gap || "30px",
        padding: config.padding,
        headingLevel: mapLevel(config.headingLevel),
        headingAlign: config.headingAlign,
        maxWidth: config.maxWidth,
        renderItem: config.renderItem,
      };
    },
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
        config.commands ||
        config.lines?.map((line) => ({
          prompt: line.text || line.prompt || "",
          response: line.response || "",
        }));

      return {
        heading: config.heading,
        commands,
        backgroundColor: config.backgroundColor,
        promptColor: config.promptColor || config.textColor,
        responseColor: config.responseColor || config.accentColor,
        windowBgColor: config.windowBgColor,
        padding: config.padding,
        headingLevel: mapLevel(config.headingLevel),
        showHeader: config.showHeader,
        maxWidth: config.maxWidth,
      };
    },
  },
  stats: {
    component: StatsCounter,
    propsMapper: (config) => ({
      ...mapTextContentProps(config, "title"),
      ...mapSectionProps(config),
      ...mapCardProps(config),
      ...mapCardContentProps(config),
      items: unwrapArrayItems(config.items, ["title", "content"]),
      columns: config.columns,
      cardAlign: mapAlignToFlex(config.card?.align),
    }),
  },
  dataStream: {
    component: DataStream,
    propsMapper: (config) => ({
      heading: config.heading,
      lines: config.lines,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      padding: config.padding,
      headingLevel: mapLevel(config.headingLevel),
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
      headingLevel: mapLevel(config.headingLevel),
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
      headingLevel: mapLevel(config.headingLevel),
      titleLevel: mapLevel(config.titleLevel),
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
      headingLevel: mapLevel(config.headingLevel),
      titleLevel: mapLevel(config.titleLevel),
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
      headingLevel: mapLevel(config.headingLevel),
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
      headingLevel: mapLevel(config.headingLevel),
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
