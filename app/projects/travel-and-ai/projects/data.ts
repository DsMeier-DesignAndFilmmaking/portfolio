// /app/projects/travel-and-ai/projects/data.ts


export const projectRegistry = {
    "context-aware-travel-decision-system": {
      title: "Context-Aware Detours",
      subtitle: "Frictionless Pathfinding via Environmental Sensing",
      color: "#3b82f6",
      problem: "Travelers miss serendipitous discoveries because they lack real-time data on 'detour viability'—fearing they'll miss deadlines if they explore.",
      brainLogic: "The Engine calculates 'Time-Buffer Slack'—the delta between current pace and hard arrival deadlines.",
      middlewareLogic: "CATDS ingests weather, foot traffic, and venue status to validate the quality and safety of the detour.",
      outcome: "A UI that offers 'Low-Stress Detours' only when the system has 95%+ confidence in arrival times.",
      features: [
        { title: "Dynamic Buffer Visual", desc: "A progress bar showing 'Safety Time' vs 'Discovery Time'." },
        { title: "Sensing Overlays", desc: "Live weather/crowd density heatmaps integrated into the path." }
      ]
    },
    "social-opportunity-matching-module": {
      title: "Social Proximity Alerts",
      subtitle: "Relational Heuristics for Real-World Connection",
      color: "#8b5cf6",
      problem: "Standard social apps create a gap between knowing someone is nearby and feeling comfortable enough to initiate a meeting.",
      brainLogic: "The Engine filters proximity signals through a 'Dopamine Governor' to prevent notification fatigue.",
      middlewareLogic: "Relational Heuristics weight 'Inner Circle' vs 'Acquaintance' to determine signal urgency.",
      outcome: "An interface that facilitates a 'Digital Handshake'—allowing an anonymous opt-in reveal.",
      features: [
        { title: "Proximity Reveal UI", desc: "Blurred avatars that sharpen only after mutual ZK-verification." },
        { title: "Contextual Icebreakers", desc: "Shared interests pulled from the Narrative layer to spark conversation." }
      ]
    },
    "social-graph-driven-travel-network": {
      title: "Privacy-First Discovery",
      subtitle: "Safe Serendipity via Zero-Knowledge Proofs",
      color: "#6366f1",
      problem: "Users want social travel benefits but refuse to sacrifice persistent location data to central servers.",
      brainLogic: "The Integrity Layer manages cryptographic keys for local-first location processing.",
      middlewareLogic: "ZK-Social Graph verifies 'Trust Degrees' without ever decrypting PII.",
      outcome: "A high-trust interface where users see validated 'Trust Signals' instead of raw tracking data.",
      features: [
        { title: "Privacy Dashboard", desc: "A real-time view of what data is being masked vs shared." },
        { title: "Encrypted Match Pulse", desc: "A visual radar showing 'Trusted Nodes' without exact GPS pins." }
      ]
    },
    "narrative-driven-travel-experience-generator": {
      title: "Semantic Travel Stories",
      subtitle: "LLM-Driven Concierge Narratives",
      color: "#f59e0b",
      problem: "Travel notifications are usually cold and robotic ('Turn left'), failing to capture the emotional intent of the journey.",
      brainLogic: "The Orchestrator determines the 'Narrative Weight' of a location based on user history.",
      middlewareLogic: "The Semantic Translation module pipes raw GPS data into a fine-tuned LLM for story synthesis.",
      outcome: "A UI that delivers 'Concierge Cards'—narrative advice that feels like a local friend's suggestion.",
      features: [
        { title: "Story Cards", desc: "Swipeable narrative recommendations instead of simple map pins." },
        { title: "Adaptive Voice Tone", desc: "UI copy that shifts tone based on time of day and user mood." }
      ]
    }
  };