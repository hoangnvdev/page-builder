export const classicEleganceConfig = {
  id: "classic-elegance",
  name: "Classic Elegance",
  description: "Timeless sophistication with traditional design",
  icon: "♔",

  layout: [
    "hero",
    "timeline",
    "about",
    "gallery",
    "testimonials",
    "cta",
    "footer",
  ],

  defaultConfig: {
    page: {
      fontFamily: 'Garamond, "Times New Roman", serif',
      backgroundColor: "#FAF8F3",
      textColor: "#2B2B2B",
    },
    elements: {
      hero: {
        title: "Distinguished Excellence Since 1895",
        subtitle: "A legacy of refinement and timeless quality",
        buttonText: "Discover Our Heritage",
        backgroundColor: "#8B7355",
        titleColor: "#FAF8F3",
        buttonColor: "#D4AF37",
      },
      timeline: {
        heading: "Our Heritage",
        backgroundColor: "#F5F1E8",
        milestones: [
          {
            year: "1895",
            title: "Founded",
            description: "Established in London with a vision for excellence",
          },
          {
            year: "1920",
            title: "Royal Warrant",
            description: "Appointed supplier to the Royal Family",
          },
          {
            year: "1965",
            title: "International",
            description: "Expanded to serve clientele worldwide",
          },
          {
            year: "2026",
            title: "Today",
            description: "Continuing our tradition of unparalleled quality",
          },
        ],
        lineColor: "#D4AF37",
        dotColor: "#8B7355",
      },
      about: {
        heading: "Our Distinguished History",
        content:
          "For over a century, we have upheld the finest traditions of excellence and service...",
        headingColor: "#8B7355",
        textColor: "#2B2B2B",
      },
      gallery: {
        heading: "Our Craftsmanship",
        images: [
          { caption: "Handcrafted Details", placeholder: "Elegant Image 1" },
          { caption: "Premium Materials", placeholder: "Elegant Image 2" },
          { caption: "Timeless Design", placeholder: "Elegant Image 3" },
        ],
        backgroundColor: "#FFFFFF",
      },
      testimonials: {
        heading: "What Our Clients Say",
        backgroundColor: "#F5F1E8",
        quotes: [
          {
            text: "Exceptional quality and service. A treasured partnership for over 30 years.",
            author: "Lady Catherine Winchester",
            title: "Private Client",
            avatar: "👤",
          },
          {
            text: "The attention to detail is extraordinary. Simply unmatched.",
            author: "Sir James Thornton",
            title: "Collector",
            avatar: "👤",
          },
        ],
      },
      cta: {
        heading: "Experience Timeless Elegance",
        subheading: "Join our distinguished clientele",
        buttonText: "Request Consultation",
        backgroundColor: "#2B2B2B",
        buttonColor: "#D4AF37",
      },
      footer: {
        text: "© MMXXVI • Established 1895 • A Tradition of Excellence",
        backgroundColor: "#8B7355",
        textColor: "#FAF8F3",
      },
    },
  },
};
