export const comicSplashConfig = {
  id: "comic-splash",
  name: "Comic Splash",
  description: "Playful comic-book style with bold colors and fun vibes",
  icon: "💥",

  layout: [
    "hero",
    "marquee",
    "comicPanels",
    "features",
    "testimonials",
    "cta",
    "footer",
  ],

  editableFields: [
    // Page Settings
    {
      id: "page.fontFamily",
      label: "Font Family",
      type: "select",
      options: [
        { value: '"Comic Sans MS", "Chalkboard SE", cursive', label: "Comic" },
        { value: '"Bangers", cursive', label: "Bangers" },
        { value: '"Fredoka One", cursive', label: "Fredoka" },
        { value: "system-ui, sans-serif", label: "System" },
      ],
    },
    { id: "page.backgroundColor", label: "Page Background", type: "color" },
    { id: "page.textColor", label: "Page Text Color", type: "color" },

    // Hero
    { id: "elements.hero.title", label: "Hero Title", type: "text" },
    { id: "elements.hero.subtitle", label: "Hero Subtitle", type: "textarea" },
    { id: "elements.hero.buttonText", label: "Button Text", type: "text" },
    {
      id: "elements.hero.backgroundColor",
      label: "Hero Background",
      type: "color",
    },
    { id: "elements.hero.titleColor", label: "Title Color", type: "color" },
    {
      id: "elements.hero.subtitleColor",
      label: "Subtitle Color",
      type: "color",
    },
    { id: "elements.hero.buttonColor", label: "Button Color", type: "color" },

    // Marquee
    { id: "elements.marquee.text", label: "Marquee Text", type: "text" },
    {
      id: "elements.marquee.backgroundColor",
      label: "Marquee Background",
      type: "color",
    },
    {
      id: "elements.marquee.textColor",
      label: "Marquee Text Color",
      type: "color",
    },

    // Comic Panels
    {
      id: "elements.comicPanels.heading",
      label: "Comic Panels Heading",
      type: "text",
    },

    // Features
    {
      id: "elements.features.heading",
      label: "Features Heading",
      type: "text",
    },
    {
      id: "elements.features.items",
      label: "Features List",
      type: "features-list",
    },
    {
      id: "elements.features.backgroundColor",
      label: "Features Background",
      type: "color",
    },

    // Testimonials
    {
      id: "elements.testimonials.heading",
      label: "Testimonials Heading",
      type: "text",
    },
    {
      id: "elements.testimonials.backgroundColor",
      label: "Testimonials Background",
      type: "color",
    },

    // CTA
    { id: "elements.cta.heading", label: "CTA Heading", type: "text" },
    { id: "elements.cta.subheading", label: "CTA Subheading", type: "text" },
    { id: "elements.cta.buttonText", label: "CTA Button Text", type: "text" },

    // Footer
    { id: "elements.footer.text", label: "Footer Text", type: "text" },
    {
      id: "elements.footer.backgroundColor",
      label: "Footer Background",
      type: "color",
    },
  ],

  configSchema: {
    page: {
      fontFamily: {
        type: "select",
        label: "Font Family",
        options: [
          {
            value: '"Comic Sans MS", "Chalkboard SE", cursive',
            label: "Comic",
          },
          { value: '"Bangers", cursive', label: "Bangers" },
          { value: '"Fredoka One", cursive', label: "Fredoka" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      backgroundColor: { type: "color", label: "Page Background" },
      textColor: { type: "color", label: "Page Text Color" },
    },
    elements: {
      hero: {
        title: { type: "text", label: "Hero Title" },
        subtitle: { type: "textarea", label: "Hero Subtitle" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        titleColor: { type: "color", label: "Title Color" },
        subtitleColor: { type: "color", label: "Subtitle Color" },
        buttonColor: { type: "color", label: "Button Color" },
      },
      marquee: {
        text: { type: "text", label: "Marquee Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
      },
      comicPanels: {
        heading: { type: "text", label: "Section Heading" },
        panels: { type: "array", label: "Comic Panels" },
      },
      features: {
        heading: { type: "text", label: "Section Heading" },
        backgroundColor: { type: "color", label: "Background Color" },
        headingColor: { type: "color", label: "Heading Color" },
        featureTitleColor: { type: "color", label: "Feature Title Color" },
        featureTextColor: { type: "color", label: "Feature Text Color" },
        items: { type: "features-list", label: "Features" },
      },
      testimonials: {
        heading: { type: "text", label: "Section Heading" },
        quotes: { type: "array", label: "Testimonials" },
        backgroundColor: { type: "color", label: "Background Color" },
      },
      cta: {
        heading: { type: "text", label: "Heading" },
        subheading: { type: "text", label: "Subheading" },
        buttonText: { type: "text", label: "Button Text" },
        backgroundColor: { type: "color", label: "Background Color" },
        textColor: { type: "color", label: "Text Color" },
        buttonColor: { type: "color", label: "Button Color" },
        buttonTextColor: { type: "color", label: "Button Text Color" },
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
      fontFamily: '"Comic Sans MS", "Chalkboard SE", cursive',
      backgroundColor: "#FFF5E1",
      textColor: "#2C1810",
    },
    elements: {
      hero: {
        title: "💥 BAM! Welcome to Our World! 💥",
        subtitle:
          "Get ready for an adventure that'll blow your socks off! We're here to make your dreams come true with a splash of fun and a whole lot of awesome!",
        buttonText: "Let's Go! 🚀",
        backgroundColor: "#FF6B9D",
        titleColor: "#FFFFFF",
        subtitleColor: "#FFF5E1",
        buttonColor: "#FFD93D",
      },
      marquee: {
        text: "🎨 POW! • 💥 BOOM! • ⭐ WHAM! • 🚀 ZOOM!",
        backgroundColor: "#FFD93D",
        textColor: "#2C1810",
      },
      comicPanels: {
        heading: "📚 How It Works 📚",
        panels: [
          {
            number: "1",
            title: "Sign Up",
            content: "Create your account faster than a speeding bullet!",
            backgroundColor: "#FF6B9D",
          },
          {
            number: "2",
            title: "Customize",
            content: "Make it yours with our super-powered tools!",
            backgroundColor: "#FFD93D",
          },
          {
            number: "3",
            title: "Launch",
            content: "Blast off into awesomeness with one click!",
            backgroundColor: "#6BCB77",
          },
          {
            number: "4",
            title: "Enjoy",
            content: "Sit back and watch the magic happen!",
            backgroundColor: "#4D96FF",
          },
        ],
      },
      features: {
        heading: "⭐ Super Powers ⭐",
        backgroundColor: "#6BCB77",
        headingColor: "#FFFFFF",
        featureTitleColor: "#FFD93D",
        featureTextColor: "#2C1810",
        items: [
          {
            icon: "🎨",
            title: "Creative Blast",
            description: "Unleash your creativity with our colorful tools!",
          },
          {
            icon: "⚡",
            title: "Lightning Speed",
            description: "Fast as a superhero, because ain't nobody got time!",
          },
          {
            icon: "🎪",
            title: "Fun Factory",
            description: "Work feels like play when you're with us!",
          },
        ],
      },
      testimonials: {
        heading: "🗨️ What People Say 🗨️",
        backgroundColor: "#FFF5E1",
        quotes: [
          {
            text: "This is absolutely AMAZING! My life changed overnight!",
            author: "Happy Customer",
            avatar: "😍",
          },
          {
            text: "I can't believe how fun and easy this is to use!",
            author: "Excited User",
            avatar: "🤩",
          },
          {
            text: "Best decision I ever made! Highly recommend!",
            author: "Satisfied Client",
            avatar: "🥳",
          },
        ],
      },
      cta: {
        heading: "Ready to Join the Party? 🎉",
        subheading: "Don't miss out on the fun! Click that button NOW!",
        buttonText: "Count Me In! 🎊",
        backgroundColor: "#4D96FF",
        textColor: "#FFFFFF",
        buttonColor: "#FFD93D",
        buttonTextColor: "#2C1810",
      },
      footer: {
        text: "© 2026 Comic Splash Co. • Made with 💖 and lots of fun!",
        backgroundColor: "#2C1810",
        textColor: "#FFD93D",
      },
    },
  },
};
