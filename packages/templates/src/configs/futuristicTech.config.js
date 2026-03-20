import {
  color,
  slider,
  text,
} from '../utils/fieldBuilders.js';
import {
  arrayField,
  buttonSchema,
  cardSchema,
  headingContentSchema,
  iconProps,
  mergeSchemas,
  sectionSchema,
  textContentPropsEnhanced,
  textContentSchema,
  titleContentSchema,
} from '../utils/genericSchemaBuilders.js';
import {
  borderRadiusOptions,
  borderWidthOptions,
  dropShadowOptions,
  footerPaddingOptions,
  footerTextSizeOptions,
} from '../utils/index.js';

export const futuristicTechRefactoredConfig = {
  id: "futuristic-tech-refactored",
  name: "Futuristic Tech",
  description:
    "Mind-blowing fusion of cyberpunk neon and sci-fi innovation aesthetics",
  icon: "🚀",

  layout: ["hero", "features", "terminal", "about", "stats", "cta", "footer"],

  configSchema: {
    // ============================================
    // PAGE-LEVEL SETTINGS
    // ============================================
    page: {
      fontFamily: {
        type: "select",
        label: "fontFamily",
        options: [
          { value: '"Orbitron", sans-serif', label: "Orbitron" },
          { value: '"Rajdhani", sans-serif', label: "Rajdhani" },
          { value: '"Exo 2", sans-serif', label: "Exo 2" },
          { value: '"Michroma", sans-serif', label: "Michroma" },
          { value: '"Share Tech Mono", monospace', label: "Share Tech Mono" },
          { value: '"Space Mono", monospace', label: "Space Mono" },
          { value: "system-ui, sans-serif", label: "System" },
        ],
      },
      title: text("pageTitle"),
    },

    // ============================================
    // ELEMENTS
    // ============================================
    elements: {
      // --------------------------
      // HERO SECTION
      // --------------------------
      hero: mergeSchemas(sectionSchema(), {
        gradientStart: color("gradientStart"),
        gradientEnd: color("gradientEnd"),
        gradientAngle: {
          type: "slider",
          label: "gradientAngle",
          min: -180,
          max: 180,
          step: 5,
        },
        title: titleContentSchema(),
        subtitle: textContentSchema("text", true),
        button: buttonSchema(),
      }),

      // --------------------------
      // FEATURES SECTION (Grid of cards)
      // --------------------------
      features: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.features.items.length",
          }),
          gap: {
            type: "select",
            label: "gap",
            options: [
              { value: "16px", label: "compact" },
              { value: "24px", label: "comfort" },
              { value: "32px", label: "spacious" },
            ],
          },
        },
        {
          heading: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            icon: iconProps(),
            title: titleContentSchema(),
            content: textContentSchema("text", true),
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // TERMINAL SECTION (Code/Terminal Demo)
      // --------------------------
      terminal: mergeSchemas(sectionSchema(), {
        heading: headingContentSchema(),
        window: {
          backgroundColor: color("backgroundColor"),
          padding: {
            type: "select",
            label: "padding",
            options: [
              { value: "1rem", label: "small" },
              { value: "1.5rem", label: "medium" },
              { value: "2rem", label: "large" },
            ],
          },
          borderRadius: {
            type: "select",
            label: "borderRadius",
            options: borderRadiusOptions,
          },
          dropShadow: {
            type: "select",
            label: "shadowBlur",
            options: dropShadowOptions,
          },
          borderWidth: {
            type: "select",
            label: "borderWidth",
            options: borderWidthOptions,
          },
          borderColor: color("borderColor"),
        },
        command: {
          prompt: textContentSchema("text"),
          response: textContentSchema("text"),
        },
        commands: { type: "array", label: "terminalCommands" },
      }),

      // --------------------------
      // ABOUT SECTION
      // --------------------------
      about: mergeSchemas(sectionSchema(), {
        heading: headingContentSchema(),
        content: mergeSchemas(textContentSchema("text", true), {
          maxWidth: {
            type: "select",
            label: "maxWidth",
            options: [
              { value: "600px", label: "small" },
              { value: "700px", label: "medium" },
              { value: "800px", label: "large" },
              { value: "100%", label: "auto" },
            ],
          },
        }),
      }),

      // --------------------------
      // STATS SECTION
      // --------------------------
      stats: mergeSchemas(
        sectionSchema(),
        {
          columns: slider("columns", 1, {
            dynamic: "elements.stats.items.length",
          }),
          gap: {
            type: "select",
            label: "gap",
            options: [
              { value: "16px", label: "compact" },
              { value: "24px", label: "comfort" },
              { value: "32px", label: "spacious" },
            ],
          },
        },
        {
          title: headingContentSchema(),
          card: mergeSchemas(cardSchema(), {
            title: headingContentSchema(),
            content: textContentSchema("text"),
          }),
          items: arrayField("items"),
        },
      ),

      // --------------------------
      // CTA SECTION
      // --------------------------
      cta: mergeSchemas(sectionSchema(), {
        title: titleContentSchema(),
        subtitle: textContentSchema("text", true),
        button: buttonSchema(),
      }),

      // --------------------------
      // FOOTER SECTION
      // --------------------------
      footer: mergeSchemas(
        {
          backgroundColor: color("backgroundColor"),
          padding: {
            type: "select",
            label: "padding",
            options: footerPaddingOptions,
          },
          align: {
            type: "select",
            label: "alignItems",
            options: [
              { value: "flex-start", label: "left" },
              { value: "center", label: "center" },
              { value: "flex-end", label: "right" },
            ],
          },
        },
        {
          text: mergeSchemas(textContentPropsEnhanced("text"), {
            size: {
              type: "select",
              label: "fontSize",
              options: footerTextSizeOptions,
            },
          }),
        },
      ),
    },
  },

  // ============================================
  // DEFAULT CONFIGURATION
  // ============================================
  defaultConfig: {
    page: {
      fontFamily: '"Orbitron", sans-serif',
      title: "Futuristic Tech - Next Generation",
    },
    elements: {
      hero: {
        backgroundColor: "#000000",
        padding: "140px 24px",
        maxWidth: "900px",
        align: "center",
        gradientStart: "#ff0080",
        gradientEnd: "#00ff9f",
        gradientAngle: 15,
        title: {
          text: "▸ ENTER THE FUTURE ◂",
          color: "#00ff9f",
          size: "4rem",
          weight: "900",
        },
        subtitle: {
          text: "Break through the boundaries of reality. Experience next-generation innovation powered by quantum computing and neural interfaces. The future isn't coming—it's already here.",
          color: "#ffffff",
          size: "1.25rem",
          weight: "400",
        },
        button: {
          text: "INITIALIZE SEQUENCE >>",
          url: "#features",
          color: "#ff0080",
          textColor: "#ffffff",
          size: "large",
          borderRadius: "8px",
        },
      },
      features: {
        backgroundColor: "#0a0014",
        padding: "100px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 3,
        gap: "32px",
        heading: {
          text: "// CORE_CAPABILITIES.EXE",
          color: "#00ff9f",
          size: "2.5rem",
          weight: "700",
        },
        card: {
          backgroundColor: "#0f0020",
          padding: "32px",
          gap: "16px",
          align: "flex-start",
          borderRadius: "12px",
          dropShadow: "0 8px 32px rgba(255, 0, 128, 0.4)",
          borderColor: "#ff0080",
          borderWidth: "2px",
          icon: "",
          title: {
            color: "#00ff9f",
            size: "1.5rem",
            weight: "600",
          },
          content: {
            color: "#ffffff",
            size: "1rem",
            weight: "400",
          },
        },
        items: [
          {
            icon: "⚛️",
            title: "Quantum Processing",
            description:
              "Harness computational power that breaks the laws of physics",
          },
          {
            icon: "🧠",
            title: "Neural Interface",
            description:
              "Direct connection between human consciousness and machine intelligence",
          },
          {
            icon: "⚡",
            title: "Neon-Speed Network",
            description:
              "Data transfer at the speed of thought through 5D infrastructure",
          },
        ],
      },
      terminal: {
        backgroundColor: "#000000",
        padding: "80px 24px",
        maxWidth: "900px",
        align: "center",
        heading: {
          text: "> SYSTEM_STATUS.LOG_",
          color: "#00ff9f",
          size: "2rem",
          weight: "700",
        },
        window: {
          backgroundColor: "#0a0014",
          padding: "1.5rem",
          borderRadius: "12px",
          dropShadow: "0 8px 32px rgba(0, 255, 159, 0.3)",
          borderWidth: "1px",
          borderColor: "#00ff9f",
        },
        commands: [
          {
            prompt: {
              text: "$ initializing quantum core...",
              color: "#00ff9f",
              size: "1rem",
              weight: "400",
            },
            response: {
              text: "[OK] Core initialized",
              color: "#8b8bff",
              size: "1rem",
              weight: "400",
            },
          },
          {
            prompt: {
              text: "$ connecting neural pathways...",
              color: "#00ff9f",
              size: "1rem",
              weight: "400",
            },
            response: {
              text: "✓ Neural pathways: CONNECTED",
              color: "#8b8bff",
              size: "1rem",
              weight: "400",
            },
          },
          {
            prompt: {
              text: "$ activating neon matrix...",
              color: "#00ff9f",
              size: "1rem",
              weight: "400",
            },
            response: {
              text: "✓ Neon matrix: ACTIVE",
              color: "#8b8bff",
              size: "1rem",
              weight: "400",
            },
          },
          {
            prompt: {
              text: "$ booting reality engine...",
              color: "#00ff9f",
              size: "1rem",
              weight: "400",
            },
            response: {
              text: "✓ Reality engine: ONLINE",
              color: "#8b8bff",
              size: "1rem",
              weight: "400",
            },
          },
          {
            prompt: {
              text: "$ system status",
              color: "#00ff9f",
              size: "1rem",
              weight: "400",
            },
            response: {
              text: "> System ready. Welcome to the future.",
              color: "#8b8bff",
              size: "1rem",
              weight: "400",
            },
          },
        ],
      },
      about: {
        backgroundColor: "#0a0014",
        padding: "80px 24px",
        maxWidth: "900px",
        align: "center",
        heading: {
          text: "// MISSION_PROTOCOL",
          color: "#ff0080",
          size: "2.5rem",
          weight: "700",
        },
        content: {
          text: "We exist at the intersection of human ingenuity and artificial superintelligence. Our mission transcends conventional boundaries—we're building the neural infrastructure that will power humanity's next evolutionary leap. Through quantum computing, neural interfaces, and reality-bending innovation, we're not just predicting the future—we're coding it into existence.",
          color: "#ffffff",
          size: "1.125rem",
          weight: "400",
          maxWidth: "800px",
        },
      },
      stats: {
        backgroundColor: "#000000",
        padding: "80px 24px",
        maxWidth: "1200px",
        align: "center",
        columns: 4,
        gap: "32px",
        title: {
          text: "> METRICS.REAL_TIME_",
          size: "2.5rem",
          weight: "700",
          color: "#00ff9f",
        },
        card: {
          backgroundColor: "rgba(255, 0, 128, 0.05)",
          padding: "30px",
          align: "center",
          borderRadius: "12px",
          dropShadow: "0 8px 24px rgba(255, 0, 128, 0.3)",
        },
        items: [
          {
            title: {
              text: "99.99%",
              size: "3rem",
              weight: "900",
              color: "#ff0080",
            },
            content: {
              text: "Uptime",
              size: "1rem",
              weight: "400",
              color: "#ffffff",
            },
          },
          {
            title: {
              text: "< 1ms",
              size: "3rem",
              weight: "900",
              color: "#ff0080",
            },
            content: {
              text: "Latency",
              size: "1rem",
              weight: "400",
              color: "#ffffff",
            },
          },
          {
            title: {
              text: "10M+",
              size: "3rem",
              weight: "900",
              color: "#ff0080",
            },
            content: {
              text: "Operations/sec",
              size: "1rem",
              weight: "400",
              color: "#ffffff",
            },
          },
          {
            title: {
              text: "∞",
              size: "3rem",
              weight: "900",
              color: "#ff0080",
            },
            content: {
              text: "Potential",
              size: "1rem",
              weight: "400",
              color: "#ffffff",
            },
          },
        ],
      },
      cta: {
        backgroundColor: "#0a0014",
        padding: "100px 24px",
        maxWidth: "900px",
        align: "center",
        title: {
          text: "// INITIATE_SEQUENCE?",
          color: "#00ff9f",
          size: "3rem",
          weight: "700",
        },
        subtitle: {
          text: "Join the revolution. Connect to the neural network. Become part of tomorrow.",
          color: "#ffffff",
          size: "1.25rem",
          weight: "400",
        },
        button: {
          text: "JACK IN NOW >>",
          url: "#connect",
          color: "#ff0080",
          textColor: "#ffffff",
          size: "large",
          borderRadius: "8px",
        },
      },
      footer: {
        text: {
          text: "© 2077 NeoTech Industries • ENCRYPTED • QUANTUM-SECURED • REALITY.V2",
          color: "#00ff9f",
          size: "0.75rem",
          weight: "400",
          decoration: "none",
        },
        backgroundColor: "#000000",
        padding: "32px 24px",
        align: "center",
      },
    },
  },
};

export default futuristicTechRefactoredConfig;
