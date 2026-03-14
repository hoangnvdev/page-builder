export const cyberpunkNeonConfig = {
  id: "cyberpunk-neon",
  name: "Cyberpunk Neon",
  description: "Futuristic dark theme with neon accents and cyberpunk vibes",
  icon: "🌃",

  layout: [
    "hero",
    "terminal",
    "stats",
    "features",
    "dataStream",
    "cta",
    "footer",
  ],

  defaultConfig: {
    page: {
      fontFamily: '"Orbitron", sans-serif',
      backgroundColor: "#0a0a0f",
      textColor: "#00ff9f",
    },
    elements: {
      hero: {
        title: "WELCOME TO THE FUTURE",
        subtitle: "Break free from the system. Experience next-gen innovation.",
        buttonText: "JACK IN >>",
        gradientStart: "#d946ef",
        gradientEnd: "#7c3aed",
        titleColor: "#00ff9f",
        buttonColor: "#ff0080",
      },
      terminal: {
        heading: "> SYSTEM_INITIALIZE...",
        commands: [
          {
            prompt: "$ connect --server mainframe",
            response: "Connection established...",
          },
          {
            prompt: "$ status --check",
            response: "All systems operational. Welcome, User.",
          },
          {
            prompt: "$ help",
            response: "Ready for your commands. Type anything.",
          },
        ],
        backgroundColor: "#0f0f1a",
        promptColor: "#00ff9f",
        responseColor: "#8b8bff",
      },
      stats: {
        heading: "// SYSTEM METRICS",
        backgroundColor: "#000000",
        items: [
          { value: "99.9%", label: "UPTIME", color: "#00ff9f" },
          { value: "10K+", label: "USERS_CONNECTED", color: "#ff0080" },
          { value: "< 50ms", label: "RESPONSE_TIME", color: "#d946ef" },
          { value: "256-BIT", label: "ENCRYPTION", color: "#7c3aed" },
        ],
      },
      features: {
        heading: "> CORE_FEATURES_",
        backgroundColor: "#0f0f1a",
        items: [
          {
            icon: "◢",
            title: "NEURAL INTERFACE",
            description: "Direct consciousness link",
          },
          {
            icon: "◣",
            title: "QUANTUM SECURITY",
            description: "Unhackable protection",
          },
          {
            icon: "◤",
            title: "NEON SPEED",
            description: "Reality-breaking performance",
          },
        ],
      },
      dataStream: {
        heading: "// DATA_FLOW",
        lines: [
          "0x7F3A9B2E...",
          "ENCRYPT::256BIT",
          "NODE_STATUS:ACTIVE",
          "SYNC::COMPLETE",
        ],
        backgroundColor: "#1a0a2e",
        textColor: "#00ff9f",
      },
      cta: {
        heading: "// READY TO REBEL?",
        subheading: "Join the underground. The revolution is now.",
        buttonText: "INITIALIZE >>",
        backgroundColor: "#1a0a2e",
        buttonColor: "#ff0080",
      },
      footer: {
        text: "© 2077 NeonCorp • ENCRYPTED • ANONYMOUS",
        backgroundColor: "#000000",
        textColor: "#00ff9f",
      },
    },
  },
};
