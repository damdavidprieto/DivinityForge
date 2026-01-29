
export const Eras = {
    PRIMORDIAL: "PRIMORDIAL",
    LIFE: "LIFE",
    CIVILIZATION: "CIVILIZATION"
};

export const EraConfig = {
    [Eras.PRIMORDIAL]: {
        name: "Primordial Era",
        description: "In the beginning, there was only void and potential. Shape the physical world.",
        nextEraThreshold: 500, // Power/Points needed to advance
        statLabel: "Entropy",
        actions: [
            {
                id: 'FORM_OCEANS',
                name: "Form Oceans",
                cost: 30,
                description: "Create vast seas.",
                domainPoints: { LIFE: 2, CHAOS: 1 },
                effects: { "atmosphere": "wet", "hostility": -2 }
            },
            {
                id: 'RAISE_MOUNTAINS',
                name: "Raise Mountains",
                cost: 40,
                description: "Forge unbreakable peaks.",
                domainPoints: { ORDER: 3, WRATH: 1 },
                effects: { "hostility": 5 }
            },
            {
                id: 'IGNITE_SKY',
                name: "Ignite Sky",
                cost: 50,
                description: "Fill the heavens with storm and fire.",
                domainPoints: { CHAOS: 4, WRATH: 2 },
                effects: { "atmosphere": "stormy", "hostility": 10 }
            },
            {
                id: 'CALM_WINDS',
                name: "Calm Winds",
                cost: 20,
                description: "Bring peace to the roaring air.",
                domainPoints: { ORDER: 2, LIFE: 1 },
                effects: { "atmosphere": "calm", "hostility": -5 }
            }
        ]
    },
    [Eras.LIFE]: {
        name: "Era of Life",
        description: "The world is formed. Now, spark the first flame of vitality.",
        nextEraThreshold: 1500,
        statLabel: "Biodiversity",
        actions: [
            {
                id: 'SPARK_LIFE',
                name: "Spark Microbes",
                cost: 50,
                description: "Single-celled life begins.",
                domainPoints: { LIFE: 5 },
                effects: { "population": 100 } // Abstracted "biomass"
            },
            {
                id: 'SPREAD_GREENERY',
                name: "Spread Forests",
                cost: 40,
                description: "Cover the stone in green.",
                domainPoints: { LIFE: 3, ORDER: 1 },
                effects: { "hostility": -5 }
            },
            {
                id: 'EVOLVE_PREDATORS',
                name: "Evolve Predators",
                cost: 60,
                description: "Strength through survival.",
                domainPoints: { WRATH: 3, CHAOS: 2 },
                effects: { "hostility": 5 }
            }
        ]
    },
    [Eras.CIVILIZATION]: {
        name: "Era of Awakening",
        description: "Consciousness arises. They look to the sky and name you.",
        nextEraThreshold: Infinity,
        statLabel: "Faith",
        actions: [
            // Generic Action
            {
                id: 'INSPIRE_WORSHIP',
                name: "Inspire Worship",
                cost: 10,
                description: "Demonstrate your power to gain faith.",
                effects: { "power": 20 }
            },
            // Builder Archetype
            {
                id: 'CONSTRUCT_WONDER',
                name: "Construct Wonder",
                cost: 100,
                description: "A monument to your glory. Reduces hostility.",
                requiredArchetype: "BUILDER",
                effects: { "hostility": -10, "stats": { "culture": 10 } }
            },
            // Warmonger Archetype
            {
                id: 'INCITE_CONQUEST',
                name: "Incite Conquest",
                cost: 80,
                description: "War feeds your power.",
                requiredArchetype: "WARMONGER",
                effects: { "population": -50, "power": 200 }
            },
            // Fertility Archetype
            {
                id: 'BLESS_HARVEST',
                name: "Bless Harvest",
                cost: 60,
                description: "Bountiful crops for your people.",
                requiredArchetype: "FERTILITY",
                effects: { "population": 200 }
            },
            // Knowledge Archetype
            {
                id: 'TEACH_WRITING',
                name: "Teach Writing",
                cost: 70,
                description: "Accelerate their understanding.",
                requiredArchetype: "KNOWLEDGE",
                effects: { "stats": { "technology": 10 } }
            },
            // Trickster Archetype
            {
                id: 'SOW_DISCORD',
                name: "Sow Discord",
                cost: 50,
                description: "Create chaos among the ranks.",
                requiredArchetype: "TRICKSTER",
                effects: { "hostility": 10, "power": 100 }
            },
            // Tyrant Archetype
            {
                id: 'DEMAND_TRIBUTE',
                name: "Demand Tribute",
                cost: 40,
                description: "Take what is yours.",
                requiredArchetype: "TYRANT",
                effects: { "population": -20, "power": 80 }
            },
            // Guardian Archetype
            {
                id: 'DIVINE_INTERVENTION',
                name: "Divine Intervention",
                cost: 90,
                description: "Protect them from harm.",
                requiredArchetype: "GUARDIAN",
                effects: { "population": 50, "hostility": -15 }
            }
        ]
    }
};
