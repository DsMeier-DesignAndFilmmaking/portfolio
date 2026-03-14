// /app/projects/travel-and-ai/projects/data.ts


export const projectRegistry = {
    "context-aware-travel-decision-system": {
      id: "catds-module",
      title: "Context-Aware Detours",
      subtitle: "Frictionless Pathfinding via Environmental Sensing",
      color: "#3b82f6",
      isAISystem: true, // This triggers the high-fidelity logic receipt
      metrics: {
        arrivalConfidence: "95%+",
        logicLatency: "<200ms"
      },
      systemSpecs: {
        slackDelta: "42m",
        confidence: 0.98,
        energyCost: "Low",
        environment: {
          weather: "Clear",
          crowds: "High"
        }
      },
      calmLogic: {
        momentDuration: "15m",
        harmonyType: "Golden Hour / Quiet Path",
        arrivalGuarantee: "5:00 PM Sharp",
        sensoryInput: "Lowered Noise Pollution",
        harmonyPoints: [
          { label: "Visual Quiet", value: "40% less foot traffic than the main road" },
          { label: "Nature Access", value: "High tree canopy coverage on this route" },
          { label: "Weather Window", value: "Clear skies for the next 45 minutes" }
        ]
      },
      content: {
        phase01: "The Brain: Calculating Time-Buffer Slack—the delta between current pace and hard arrival deadlines.",
        phase02: "The Middleware: CATDS ingests weather, foot traffic, and venue status to validate the quality and safety of the detour.",
        humanProblem: "Travelers miss serendipitous discoveries because they lack real-time data on 'detour viability'—fearing they'll miss deadlines if they explore."
      },
      problem: "Travelers miss serendipitous discoveries because they lack real-time data on 'detour viability'—fearing they'll miss deadlines if they explore.",
      brainLogic: "The Engine calculates 'Time-Buffer Slack'—the delta between current pace and hard arrival deadlines.",
      middlewareLogic: "CATDS ingests weather, foot traffic, and venue status to validate the quality and safety of the detour.",
      outcome: "A UI that offers 'Low-Stress Detours' only when the system has 95%+ confidence in arrival times."
    },
    "social-opportunity-matching-module": {
      title: "Social Proximity Alerts",
      subtitle: "Relational Heuristics for Real-World Connection",
      color: "#8b5cf6",
      isAISystem: true,
      proximitySignal: "High-Value",
      interactionFriction: "Low (Shared Venue)",
      privacyLevel: "ZK-Reveal Active",
      problem: "Standard social apps create a gap between knowing someone is nearby and feeling comfortable enough to initiate a meeting.",
      brainLogic: "The Engine filters proximity signals through a 'Dopamine Governor' to prevent notification fatigue.",
      middlewareLogic: "Relational Heuristics weight 'Inner Circle' vs 'Acquaintance' to determine signal urgency.",
      outcome: "An interface that facilitates a 'Digital Handshake'—allowing an anonymous opt-in reveal.",
      metrics: {
        zkProofStatus: "Verified",
        relationalNodes: "7 shared",
        proximityAccuracy: "<50m"
      },
      systemSpecs: {
        zkProofStatus: "Active",
        relationalGraphNodes: 7,
        proximityHeuristics: {
          distance: "240m",
          trustDegree: "2nd",
          anonymityShield: "Active"
        },
        governorStatus: "Optimal",
        confidence: 0.88
      },
      content: {
        phase01: "The Brain: Dopamine Governor filters proximity signals to prevent notification fatigue.",
        phase02: "The Middleware: Relational Heuristics weight 'Inner Circle' vs 'Acquaintance' to determine signal urgency.",
        humanProblem: "Standard social apps create a gap between knowing someone is nearby and feeling comfortable enough to initiate a meeting."
      },
      features: [
        { title: "Proximity Reveal UI", desc: "Blurred avatars that sharpen only after mutual ZK-verification." },
        { title: "Contextual Icebreakers", desc: "Shared interests pulled from the Narrative layer to spark conversation." }
      ],
      sharedInterest: "Tech Design",
      highFidelitySurface: {
        type: "SocialLogicReceipt",
        config: {
          initialBlur: 25,
          proximityScore: 0.88,
          sharedContexts: ["AI Architecture", "Tokyo Design Week"],
          governorStatus: "Optimal"
        }
      },
      socialLogic: {
        energyBuffer: 0.75,
        affinityStory: "High-Trust Connection",
        contextReasoning: "Quiet venue nearby + 40m schedule gap",
        vibeMatch: "86%",
        actionPrompt: "Alex is nearby. Would a 10m 'catch-up' walk fit your energy level?",
        connectionStory: "Last seen 4 months ago in NY",
        energyStatus: "Preserving Focus"
      },
      handshakeData: {
        revealStatus: "anonymous",
        sharedInterests: [
          { text: "Both mentioned wanting to try the espresso", icon: "coffee" },
          { text: "Both in Berlin for Design Week", icon: "map" }
        ],
        energyLevel: 25,
        locationContext: "The Barn"
      },
      humanContext: {
        affinityReason: "Worked together at [Company]",
        frictionScore: "Low - 3m detour",
        sharedVibe: "Quiet Coffee",
        connectionName: "Marcus",
        location: "The Barn",
        icebreaker: "You both mentioned wanting to try their espresso."
      }
    },
    "social-graph-driven-travel-network": {
      title: "Unlock the world’s hidden social graph",
      subtitle: "Safe Serendipity via Zero-Knowledge Proofs",
      color: "#6366f1",
      isAISystem: true,
      problem: "Users want social travel benefits but refuse to sacrifice persistent location data to central servers.",
      brainLogic: "The Integrity Layer manages cryptographic keys for local-first location processing.",
      middlewareLogic: "ZK-Social Graph verifies 'Trust Degrees' without ever decrypting PII.",
      outcome: "A high-trust interface where users see validated 'Trust Signals' instead of raw tracking data.",
      metrics: {
        privacyLevel: "ZK-Encrypted",
        trustSignals: "13,056 active",
        verificationRate: "98.5%"
      },
      systemSpecs: {
        zkProtocol: "v4",
        encryptedProximity: true,
        trustDegree: {
          firstDegree: 45,
          secondDegree: 312,
          verified: true
        },
        anonymityShield: "Active",
        confidence: 0.985
      },
      content: {
        phase01: "The Brain: Integrity Layer manages cryptographic keys for local-first location processing.",
        phase02: "The Middleware: ZK-Social Graph verifies 'Trust Degrees' without ever decrypting PII.",
        humanProblem: "Users want social travel benefits but refuse to sacrifice persistent location data to central servers."
      }
    },
    "narrative-driven-travel-experience-generator": {
      title: "Semantic Travel Stories",
      subtitle: "LLM-Driven Concierge Narratives",
      color: "#f59e0b",
      isAISystem: true,
      problem: "Travel notifications are usually cold and robotic ('Turn left'), failing to capture the emotional intent of the journey.",
      brainLogic: "The Orchestrator determines the 'Narrative Weight' of a location based on user history.",
      middlewareLogic: "The Semantic Translation module pipes raw GPS data into a fine-tuned LLM for story synthesis.",
      outcome: "A UI that delivers 'Concierge Cards'—narrative advice that feels like a local friend's suggestion.",
      metrics: {
        narrativeAccuracy: "94%",
        semanticLatency: "<300ms",
        storyQuality: "High"
      },
      systemSpecs: {
        llmModel: "GPT-4 Fine-tuned",
        narrativeWeight: 0.92,
        semanticSynthesis: {
          voiceTones: ["concierge", "friend", "minimalist"],
          spontaneityScore: 0.55,
          storyThemes: ["Serendipity", "Urban Calm"]
        },
        confidence: 0.94
      },
      content: {
        phase01: "The Brain: Orchestrator determines the 'Narrative Weight' of a location based on user history.",
        phase02: "The Middleware: Semantic Translation module pipes raw GPS data into a fine-tuned LLM for story synthesis.",
        humanProblem: "Travel notifications are usually cold and robotic ('Turn left'), failing to capture the emotional intent of the journey."
      },
      narrativeData: {
        narrativeThemes: ["Serendipity", "Urban Calm"],
        dailySummary: "You traded the main road for a moment of silence, discovering a hidden park during golden hour. A brief encounter with a fellow traveler added warmth to an otherwise solitary afternoon.",
        spontaneityScore: {
          planned: 45,
          spontaneous: 55
        },
        moments: [
          { time: "9:00 AM", event: "Departure", weight: 0.3, type: "planned" },
          { time: "2:30 PM", event: "Golden Hour Detour", weight: 0.92, type: "spontaneous", inputs: "Unusual Proximity + Calm Buffer Used" },
          { time: "4:15 PM", event: "Social Match", weight: 0.78, type: "spontaneous", inputs: "High-Trust Connection + Low Friction" },
          { time: "6:00 PM", event: "Arrival", weight: 0.4, type: "planned" }
        ],
        voiceTones: {
          concierge: "We recommend a moment of pause at the park entrance—the light is particularly striking at this hour.",
          friend: "Hey, that park you passed? Perfect spot for a quick breather. The lighting's amazing right now.",
          minimalist: "Park entrance. 2 minutes. Golden hour."
        },
        semanticStory: {
          location: "Shinjuku, Tokyo",
          reflectionHeader: "Evening Reflection",
          storyBody: {
            storyteller: "Today wasn't just about moving through the city; it was about the spaces in between. That 15-minute detour through the Gyoen Garden became the highlight of your morning—a moment of urban serenity that the system recognized and protected.",
            concierge: "Your journey through Shinjuku today included a carefully curated moment of pause. The Gyoen Garden detour, suggested during your 15-minute buffer, offered optimal lighting and reduced foot traffic—transforming transit into tranquility.",
            minimalist: "Path: Gyoen Garden | Duration: 15m | Buffer: Protected | Outcome: Arrival on-time"
          },
          semanticTags: [
            { label: "Theme", value: "Urban Serenity" },
            { label: "Steps", value: "14k" },
            { label: "Connections", value: "1 Social" }
          ],
          insightNodes: [
            { time: "9:00 AM", event: "Departure", logic: "CATDS: Route initialized" },
            { time: "10:30 AM", event: "Gyoen Detour", logic: "CATDS triggered: Weather validated at 10:30 AM. Calm buffer: 15m available." },
            { time: "2:15 PM", event: "Social Match", logic: "Relational Heuristics: High-trust connection detected. Low friction path." },
            { time: "6:00 PM", event: "Arrival", logic: "System: All waypoints completed within tolerance." }
          ],
          engineData: {
            gpsPings: 47,
            weatherChecks: 8,
            socialInteractions: 1,
            detoursSuggested: 2,
            detoursAccepted: 1
          }
        }
      }
    },
    "spontaneous-travel-companion": {
      title: "Spontaneous Travel Engine",
      subtitle: "Ambient discovery without planning overhead",
      tagline: "A low-friction travel companion that surfaces moments when context is right.",
      color: "#0f172a",
      isAISystem: false,
      problem: "Travelers miss meaningful moments because discovery tools require too much manual input.",
      outcome: "A companion that quietly orchestrates spontaneity and reduces cognitive load."
    },
    "trust-framework-ai-travel": {
      title: "Trust Framework for AI-Driven Travel",
      subtitle: "Verification-first recommendations",
      tagline: "A system architecture that makes AI travel advice auditable and credible.",
      color: "#0e7490",
      isAISystem: false,
      problem: "AI travel recommendations decay quickly without provenance, verification, and freshness.",
      outcome: "A trust layer that tracks source credibility and data recency before surfacing guidance."
    }
  };
