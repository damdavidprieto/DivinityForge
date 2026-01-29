
const GodArchetypes = {
    NEUTRAL: {
        id: "NEUTRAL",
        name: "The Observer",
        description: "A deity that watches but rarely interferes.",
        passives: { powerGen: 1, popGrowth: 1.0, hostilityChange: 0 }
    },
    TYRANT: {
        id: "TYRANT",
        name: "The Tyrant",
        description: "Rules through fear. Gains power from low population happiness.",
        passives: { powerGen: 1.5, popGrowth: 0.8, hostilityChange: 0.05 }
    },
    GUARDIAN: {
        id: "GUARDIAN",
        name: "The Guardian",
        description: "Protects the weak. Gains power from high population.",
        passives: { powerGen: 1.0, popGrowth: 1.2, hostilityChange: -0.02 }
    },
    TRICKSTER: {
        id: "TRICKSTER",
        name: "The Trickster",
        description: "Thrives on chaos. Random events happen more often.",
        passives: { powerGen: 1.1, popGrowth: 1.0, hostilityChange: 0.1, eventRate: 2.0 }
    },
    BUILDER: {
        id: "BUILDER",
        name: "The Architect",
        description: "Obsessed with order and construction. Structures are cheaper.",
        passives: { powerGen: 1.0, popGrowth: 1.1, hostilityChange: -0.01, buildCost: 0.8 }
    },
    WARMONGER: {
        id: "WARMONGER",
        name: "The Warlord",
        description: "Blood feeds the soil. Gains massive power from deaths.",
        passives: { powerGen: 0.5, popGrowth: 0.9, hostilityChange: 0.2, killPowerBonus: 5 }
    },
    FERTILITY: {
        id: "FERTILITY",
        name: "The Lifebringer",
        description: "Life blooms in your wake. Population grows rapidly.",
        passives: { powerGen: 1.0, popGrowth: 1.5, hostilityChange: -0.05 }
    },
    KNOWLEDGE: {
        id: "KNOWLEDGE",
        name: "The Sage",
        description: "Knowledge is power. Gains power from civilization level.",
        passives: { powerGen: 0.8, popGrowth: 1.0, hostilityChange: 0, techSpeed: 1.5 }
    }
};

export default GodArchetypes;
