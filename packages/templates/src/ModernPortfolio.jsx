import PropTypes from "prop-types";

import { Page } from "@page-builder/ui";

import { ContentSection } from "./components/ContentSection";
import { Footer } from "./components/Footer";
import { Hero } from "./components/Hero";
import { ItemGrid } from "./components/ItemGrid";

export const ModernPortfolio = ({ config }) => {
  const { page, elements } = config;

  return (
    <Page
      fontFamily={page.fontFamily}
      backgroundColor={page.backgroundColor}
      textColor={page.textColor}
    >
      <Hero
        title={elements.hero.title}
        subtitle={elements.hero.subtitle}
        buttonText={elements.hero.buttonText}
        gradientStart={elements.hero.gradientStart}
        gradientEnd={elements.hero.gradientEnd}
        buttonColor={elements.hero.buttonColor}
        titleColor="white"
        subtitleColor="white"
      />

      <ContentSection
        heading={elements.about.heading}
        content={elements.about.content}
        headingColor={elements.about.headingColor}
        textColor={elements.about.textColor}
        dataElement="about"
      />

      <ItemGrid
        heading={elements.projects.heading}
        items={elements.projects.items}
        backgroundColor={elements.projects.backgroundColor}
        headingColor={elements.projects.headingColor}
        itemTitleColor={elements.projects.cardTitleColor}
        dataElement="projects"
        minItemWidth="300px"
        gap="30px"
      />

      <Footer
        text={elements.footer.text}
        backgroundColor={elements.footer.backgroundColor}
        textColor={elements.footer.textColor}
      />
    </Page>
  );
};

ModernPortfolio.propTypes = {
  config: PropTypes.shape({
    page: PropTypes.shape({
      fontFamily: PropTypes.string,
      backgroundColor: PropTypes.string,
      textColor: PropTypes.string,
    }).isRequired,
    elements: PropTypes.object.isRequired,
  }).isRequired,
};

export const modernPortfolioConfig = {
  id: "modern-portfolio",
  name: "Modern Portfolio",
  description: "Clean and professional portfolio layout",
  icon: "🎨",

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: "Arial, sans-serif", label: "Arial" },
        { value: "Georgia, serif", label: "Georgia" },
        { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "text" },
    { id: "elements.hero.buttonText", label: "Hero Button Text", type: "text" },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },
    {
      id: "elements.hero.gradientStart",
      label: "Gradient Start Color",
      type: "color",
    },
    {
      id: "elements.hero.gradientEnd",
      label: "Gradient End Color",
      type: "color",
    },

    // About
    { id: "elements.about.heading", label: "About Heading", type: "text" },
    { id: "elements.about.content", label: "About Content", type: "textarea" },
    {
      id: "elements.about.headingColor",
      label: "About Heading Color",
      type: "color",
    },
    {
      id: "elements.about.textColor",
      label: "About Text Color",
      type: "color",
    },

    // Projects
    {
      id: "elements.projects.heading",
      label: "Projects Heading",
      type: "text",
    },
    {
      id: "elements.projects.items",
      label: "Projects List",
      type: "projects-list",
    },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
    {
      id: "elements.footer.backgroundColor",
      label: "Footer Background",
      type: "color",
    },
    {
      id: "elements.footer.textColor",
      label: "Footer Text Color",
      type: "color",
    },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          { value: "Arial, sans-serif", label: "Arial" },
          { value: "Georgia, serif", label: "Georgia" },
          { value: '"Segoe UI", sans-serif', label: "Segoe UI" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      backgroundColor: {
        type: "color",
        label: "Page Background",
      },
      textColor: {
        type: "color",
        label: "Page Text Color",
      },
    },
    elements: {
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "text", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        buttonColor: { type: "color", label: "Button Color" },
        gradientStart: { type: "color", label: "Gradient Start" },
        gradientEnd: { type: "color", label: "Gradient End" },
      },
      about: {
        heading: { type: "text", label: "Section Heading" },
        content: { type: "textarea", label: "About Content" },
        headingColor: { type: "color", label: "Heading Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      projects: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        cardTitleColor: { type: "color", label: "Card Title Color" },
        items: { type: "projects-list", label: "Projects" },
      },
      footer: {
        text: { type: "text", label: "Footer Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
    },
  },

  defaultConfig: {
    page: {
      fontFamily: "system-ui, sans-serif",
      backgroundColor: "#ffffff",
      textColor: "#1a1a1a",
    },
    elements: {
      hero: {
        title: "Hi, I'm Alex Designer",
        subtitle: "Creative Developer & Designer",
        buttonText: "View My Work",
        buttonColor: "#2563eb",
        gradientStart: "#6366f1",
        gradientEnd: "#8b5cf6",
      },
      about: {
        heading: "About Me",
        content:
          "I'm a passionate designer and developer with 5 years of experience creating beautiful, user-friendly digital experiences. I specialize in web design, branding, and interactive experiences.",
        headingColor: "#1a1a1a",
        textColor: "#4a4a4a",
      },
      projects: {
        heading: "Featured Projects",
        backgroundColor: "#f8f9fa",
        headingColor: "#1a1a1a",
        cardTitleColor: "#2563eb",
        items: [
          {
            title: "E-Commerce Platform",
            description: "Modern online shopping experience",
          },
          {
            title: "Brand Identity",
            description: "Complete branding suite for tech startup",
          },
          {
            title: "Mobile App",
            description: "iOS & Android fitness tracking app",
          },
        ],
      },
      footer: {
        text: "© 2026 Alex Designer. All rights reserved.",
        backgroundColor: "#1a1a1a",
        textColor: "#ffffff",
      },
    },
  },
};
