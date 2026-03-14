import React from "react";

import { CallToAction } from "../../components/CallToAction";
import { ComicPanels } from "../../components/ComicPanels";
import { ContentSection } from "../../components/ContentSection";
import { DataStream } from "../../components/DataStream";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Hero } from "../../components/Hero";
import { ImageGrid } from "../../components/ImageGrid";
import { ItemGrid } from "../../components/ItemGrid";
import { Marquee } from "../../components/Marquee";
import { QuoteBlock } from "../../components/QuoteBlock";
import { SpeechBubbleTestimonials } from "../../components/SpeechBubbleTestimonials";
import { SplitScreen } from "../../components/SplitScreen";
import { StatsCounter } from "../../components/StatsCounter";
import { TechSpecs } from "../../components/TechSpecs";
import { Terminal } from "../../components/Terminal";
import { TestimonialCards } from "../../components/TestimonialCards";
import { Timeline } from "../../components/Timeline";

export const componentRegistry = {
  header: {
    component: Header,
    propsMapper: (config, templateConfig) => ({
      companyName: config.companyName,
      backgroundColor: config.backgroundColor,
      logoColor: config.logoColor,
      linkColor: config.linkColor,
      links: templateConfig?.navLinks || [],
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
      titleColor: config.titleColor,
      subtitleColor: config.subtitleColor,
      buttonColor: config.buttonColor || config.ctaButtonColor,
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
      dataElement: "features",
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
      dataElement: "projects",
      minItemWidth: "300px",
      gap: "30px",
    }),
  },
  about: {
    component: ContentSection,
    propsMapper: (config) => ({
      heading: config.heading,
      content: config.content,
      headingColor: config.headingColor,
      textColor: config.textColor,
      dataElement: "about",
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
    }),
  },
  footer: {
    component: Footer,
    propsMapper: (config) => ({
      text: config.text,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
    }),
  },
  // Comic Splash Components
  marquee: {
    component: Marquee,
    propsMapper: (config) => ({
      text: config.text,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
    }),
  },
  comicPanels: {
    component: ComicPanels,
    propsMapper: (config) => ({
      heading: config.heading,
      panels: config.panels,
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
    }),
  },
  stats: {
    component: StatsCounter,
    propsMapper: (config) => ({
      heading: config.heading,
      items: config.items,
      backgroundColor: config.backgroundColor,
    }),
  },
  dataStream: {
    component: DataStream,
    propsMapper: (config) => ({
      heading: config.heading,
      lines: config.lines,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
    }),
  },
  // Swiss Brutalist Components
  splitScreen: {
    component: SplitScreen,
    propsMapper: (config) => ({
      imagePosition: config.imagePosition,
      imagePlaceholder: config.imagePlaceholder,
      heading: config.heading,
      content: config.content,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
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
    }),
  },
  imageGrid: {
    component: ImageGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      images: config.images,
      backgroundColor: config.backgroundColor,
      columns: config.columns,
    }),
  },
  gallery: {
    component: ImageGrid,
    propsMapper: (config) => ({
      heading: config.heading,
      images: config.images,
      backgroundColor: config.backgroundColor,
      columns: config.columns || 3,
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
    }),
  },
  // Sci-Fi Tech Components
  metrics: {
    component: StatsCounter,
    propsMapper: (config) => ({
      heading: config.heading,
      stats: config.stats,
      backgroundColor: config.backgroundColor,
    }),
  },
  techSpecs: {
    component: TechSpecs,
    propsMapper: (config) => ({
      heading: config.heading,
      specs: config.specs,
      backgroundColor: config.backgroundColor,
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
