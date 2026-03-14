import React from 'react';

import { CallToAction } from '../../components/CallToAction';
import { ComicPanels } from '../../components/ComicPanels';
import { ContentSection } from '../../components/ContentSection';
import { DataStream } from '../../components/DataStream';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { Hero } from '../../components/Hero';
import { ImageGrid } from '../../components/ImageGrid';
import { ItemGrid } from '../../components/ItemGrid';
import { Marquee } from '../../components/Marquee';
import { QuoteBlock } from '../../components/QuoteBlock';
import {
  SpeechBubbleTestimonials,
} from '../../components/SpeechBubbleTestimonials';
import { SplitScreen } from '../../components/SplitScreen';
import { StatsCounter } from '../../components/StatsCounter';
import { TechSpecs } from '../../components/TechSpecs';
import { Terminal } from '../../components/Terminal';
import { TestimonialCards } from '../../components/TestimonialCards';
import { Timeline } from '../../components/Timeline';

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
      logoLevel: config.logoLevel,
      linkGap: config.linkGap,
      maxWidth: config.maxWidth,
    }),
  },
  hero: {
    component: Hero,
    propsMapper: (config) => ({
      title: config.title,
      subtitle: config.subtitle,
      buttonText: config.buttonText || config.ctaButtonText,
      backgroundColor: config.backgroundColor,
      gradientStart: config.gradientStart,
      gradientEnd: config.gradientEnd,
      gradientAngle: config.gradientAngle,
      titleColor: config.titleColor,
      subtitleColor: config.subtitleColor,
      buttonColor: config.buttonColor || config.ctaButtonColor,
      buttonTextColor: config.buttonTextColor,
      padding: config.padding,
      align: config.align,
      titleLevel: config.titleLevel,
      maxWidth: config.maxWidth,
      gap: config.gap,
      buttonSize: config.buttonSize,
      buttonVariant: config.buttonVariant,
    }),
  },
  features: {
    component: ItemGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      items: config.items,
      backgroundColor: config.backgroundColor,
      headingColor: config.headingColor,
      itemTitleColor: config.featureTitleColor,
      itemTextColor: config.featureTextColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel: config.headingLevel,
      headingAlign: config.headingAlign,
      maxWidth: config.maxWidth,
      renderItem: config.renderItem,
    }),
  },
  projects: {
    component: ItemGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      items: config.items,
      backgroundColor: config.backgroundColor,
      headingColor: config.headingColor,
      itemTitleColor: config.cardTitleColor,
      itemTextColor: config.cardTextColor,
      columns: config.columns || 3,
      gap: config.gap || "30px",
      padding: config.padding,
      headingLevel: config.headingLevel,
      headingAlign: config.headingAlign,
      maxWidth: config.maxWidth,
      renderItem: config.renderItem,
    }),
  },
  about: {
    component: ContentSection,
    propsMapper: (config) => ({
      heading: config.heading,
      content: config.content,
      headingColor: config.headingColor,
      textColor: config.textColor,
      backgroundColor: config.backgroundColor,
      maxWidth: config.maxWidth,
      padding: config.padding,
      headingLevel: config.headingLevel,
      align: config.align,
      gap: config.gap,
    }),
  },
  cta: {
    component: CallToAction,
    propsMapper: (config) => ({
      heading: config.heading,
      subheading: config.subheading,
      buttonText: config.buttonText,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      buttonColor: config.buttonColor,
      buttonTextColor: config.buttonTextColor,
      padding: config.padding,
      align: config.align,
      headingLevel: config.headingLevel,
      buttonSize: config.buttonSize,
      buttonVariant: config.buttonVariant,
      maxWidth: config.maxWidth,
      gap: config.gap,
    }),
  },
  footer: {
    component: Footer,
    propsMapper: (config) => ({
      text: config.text,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      padding: config.padding,
      align: config.align,
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
      speed: config.speed,
      repeat: config.repeat,
    }),
  },
  comicPanels: {
    component: ComicPanels,
    propsMapper: (config) => ({
      heading: config.heading,
      panels: config.panels,
      columns: config.columns,
      gap: config.gap,
      backgroundColor: config.backgroundColor,
      padding: config.padding,
      headingLevel: config.headingLevel,
      maxWidth: config.maxWidth,
      renderPanel: config.renderPanel,
    }),
  },
  testimonials: {
    component: (props) => {
      // Use SpeechBubbleTestimonials if quotes have avatars (Comic style)
      // Use TestimonialCards if quotes have titles (Classic style)
      const hasTitle = props.quotes?.[0]?.title;
      const Component = hasTitle ? TestimonialCards : SpeechBubbleTestimonials;
      return React.createElement(Component, props);
    },
    propsMapper: (config) => ({
      heading: config.heading,
      quotes: config.quotes,
      backgroundColor: config.backgroundColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel: config.headingLevel,
      avatarSize: config.avatarSize,
      showAvatar: config.showAvatar,
      maxWidth: config.maxWidth,
      renderQuote: config.renderQuote,
    }),
  },
  // Cyberpunk Components
  terminal: {
    component: Terminal,
    propsMapper: (config) => ({
      heading: config.heading,
      commands: config.commands,
      backgroundColor: config.backgroundColor,
      promptColor: config.promptColor,
      responseColor: config.responseColor,
      windowBgColor: config.windowBgColor,
      padding: config.padding,
      headingLevel: config.headingLevel,
      showHeader: config.showHeader,
      maxWidth: config.maxWidth,
    }),
  },
  stats: {
    component: StatsCounter,
    propsMapper: (config) => ({
      heading: config.heading,
      items: config.items,
      backgroundColor: config.backgroundColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel: config.headingLevel,
      valueLevel: config.valueLevel,
      align: config.align,
      maxWidth: config.maxWidth,
      renderStat: config.renderStat,
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
      headingLevel: config.headingLevel,
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
      headingLevel: config.headingLevel,
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
      heading: config.heading,
      images: config.images,
      backgroundColor: config.backgroundColor,
      columns: config.columns,
      gap: config.gap,
      padding: config.padding,
      headingLevel: config.headingLevel,
      imageHeight: config.imageHeight,
      maxWidth: config.maxWidth,
      renderImage: config.renderImage,
    }),
  },
  gallery: {
    component: ImageGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      images: config.images,
      backgroundColor: config.backgroundColor,
      columns: config.columns || 3,
      gap: config.gap,
      padding: config.padding,
      headingLevel: config.headingLevel,
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
      headingLevel: config.headingLevel,
      titleLevel: config.titleLevel,
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
      headingLevel: config.headingLevel,
      titleLevel: config.titleLevel,
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
      headingLevel: config.headingLevel,
      valueLevel: config.valueLevel,
      align: config.align,
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
      headingLevel: config.headingLevel,
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
