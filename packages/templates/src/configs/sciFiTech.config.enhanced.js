export const sciFiTechConfig = {
  id: "sci-fi-tech",
  name: "Sci-Fi Tech",
  description: "Futuristic clean design with innovative tech aesthetics",
  icon: "🚀",

  layout: [
    "hero",
    "metrics",
    "features",
    "techSpecs",
    "roadmap",
    "cta",
    "footer",
  ],

  defaultConfig: {
    page: {
      fontFamily: '"Exo 2", sans-serif',
      backgroundColor: "#0B1120",
      textColor: "#E0E7FF",
    },
    elements: {
      hero: {
        title: "The Future is Now",
        subtitle:
          "Harness next-generation technology. Transform possibilities into reality.",
        buttonText: "Launch Platform →",
        gradientStart: "#4F46E5",
        gradientEnd: "#06B6D4",
        titleColor: "#FFFFFF",
        buttonColor: "#06B6D4",
      },
      metrics: {
        heading: "Live Metrics",
        backgroundColor: "#111827",
        stats: [
          {
            value: "99.99%",
            label: "Uptime",
            trend: "+0.01%",
            color: "#06B6D4",
          },
          {
            value: "< 10ms",
            label: "Latency",
            trend: "-5ms",
            color: "#4F46E5",
          },
          {
            value: "1M+",
            label: "Operations/sec",
            trend: "+15%",
            color: "#10B981",
          },
          { value: "256", label: "AI Models", trend: "+12", color: "#8B5CF6" },
        ],
      },
      features: {
        heading: "Advanced Capabilities",
        backgroundColor: "#111827",
        items: [
          {
            icon: "◈",
            title: "Quantum Processing",
            description: "Next-gen computational power",
          },
          {
            icon: "◈",
            title: "Neural Networks",
            description: "AI that learns and adapts",
          },
          {
            icon: "◈",
            title: "Cloud Singularity",
            description: "Seamless integration",
          },
        ],
      },
      techSpecs: {
        heading: "Technical Specifications",
        backgroundColor: "#0B1120",
        specs: [
          { category: "Processing", value: "Quantum Core • 128 qubits" },
          { category: "Memory", value: "1TB Neural Cache • Instant Access" },
          { category: "Network", value: "10Gbps • Zero Latency Protocol" },
          {
            category: "Security",
            value: "Post-Quantum Encryption • Unhackable",
          },
        ],
      },
      roadmap: {
        heading: "Evolution Roadmap",
        backgroundColor: "#1E293B",
        phases: [
          {
            quarter: "Q1 2026",
            title: "Launch",
            status: "completed",
            description: "Platform goes live",
          },
          {
            quarter: "Q2 2026",
            title: "AI Integration",
            status: "in-progress",
            description: "Neural network enhancement",
          },
          {
            quarter: "Q3 2026",
            title: "Quantum Leap",
            status: "planned",
            description: "Quantum processing addition",
          },
          {
            quarter: "Q4 2026",
            title: "Global Scale",
            status: "planned",
            description: "Worldwide deployment",
          },
        ],
      },
      cta: {
        heading: "Ready to Evolve?",
        subheading: "Join pioneers shaping the future",
        buttonText: "Start Your Journey →",
        backgroundColor: "#1E293B",
        buttonColor: "#4F46E5",
      },
      footer: {
        text: "© 2026 FutureTech • Advancing Humanity Forward",
        backgroundColor: "#000000",
        textColor: "#06B6D4",
      },
    },
  },
};
