
export const Eras = {
    PRIMORDIAL: "PRIMORDIAL",
    LIFE: "LIFE",
    CIVILIZATION: "CIVILIZATION"
};

export const EraConfig = {
    [Eras.PRIMORDIAL]: {
        name: "Primordial Era",
        description: "In the beginning, there was only void and potential. Shape the physical world.",
        nextEraThreshold: 500,
        statLabel: "Entropy",
        actions: [
            {
                id: 'FORM_OCEANS',
                name: "Form Oceans",
                cost: 30,
                description: "Create vast seas.",
                lore: "Water is the cradle of all that will breathe.",
                tip: "Increases Hydration and slightly boosts Life domain. Reduces world hostility.",
                domainPoints: { LIFE: 2, CHAOS: 1 },
                effects: { "atmosphere": "wet", "hostility": -2, "hydration": 20, "temperature": -5 }
            },
            {
                id: 'RAISE_MOUNTAINS',
                name: "Raise Mountains",
                cost: 40,
                description: "Push the earth high.",
                lore: "Stone bones for the world to come.",
                tip: "Increases Temperature and Order. Creates a stable backbone for the planet.",
                domainPoints: { ORDER: 3, WRATH: 1 },
                effects: { "hostility": 5, "temperature": 15 }
            },
            {
                id: 'IGNITE_SKY',
                name: "Ignite Sky",
                cost: 50,
                description: "Stir the atmosphere.",
                lore: "Fires in the heavens catalyze the dance of atoms.",
                tip: "High Chaos gain. Increases Temperature and Hostility significantly.",
                domainPoints: { CHAOS: 4, WRATH: 2 },
                effects: { "atmosphere": "stormy", "hostility": 10, "temperature": 10 }
            },
            {
                id: 'STABILIZE_CORE',
                name: "Stabilize Core",
                cost: 25,
                description: "Calm the inner fires.",
                lore: "Foundations must be solid to hold the weight of destiny.",
                tip: "High Order gain. Reduces Temperature and Hostility.",
                domainPoints: { ORDER: 4 },
                effects: { "temperature": -15, "hostility": -5 }
            },
            {
                id: 'VOLCANIC_BURST',
                name: "Volcanic Burst",
                cost: 45,
                description: "Unleash magma.",
                lore: "Destruction is the first step of creation.",
                tip: "Increases WRATH and CHAOS. Massive Temperature boost.",
                domainPoints: { WRATH: 3, CHAOS: 2 },
                effects: { "temperature": 25, "hostility": 5 }
            },
            {
                id: 'COMET_IMPACT',
                name: "Comet Impact",
                cost: 35,
                description: "Bring water from the stars.",
                lore: "Frozen messengers bearing the seeds of future rivers.",
                tip: "Increases CHAOS and LIFE. Boosts Hydration.",
                domainPoints: { CHAOS: 3, LIFE: 2 },
                effects: { "hydration": 15, "hostility": 2 }
            }
        ]
    },
    [Eras.LIFE]: {
        name: "Era of Life",
        description: "The world is formed. Now, spark the first flame of vitality.",
        nextEraThreshold: 1500,
        statLabel: "Complexity",
        actions: [
            {
                id: 'SPARK_LIFE',
                name: "Spark Microbes",
                cost: 50,
                description: "Begin evolution.",
                lore: "A heartbeat in the dust.",
                tip: "Increases LIFE. Starts population growth.",
                domainPoints: { LIFE: 5 },
                effects: { "population": 100 }
            },
            {
                id: 'SPREAD_GREENERY',
                name: "Spread Forests",
                cost: 40,
                description: "Coating the world.",
                lore: "A thousand leaves reaching for a sun they do not understand.",
                tip: "Boosts Hydration and LIFE. Reduces Hostility.",
                domainPoints: { LIFE: 3, ORDER: 1 },
                effects: { "hostility": -5, "hydration": 10 }
            },
            {
                id: 'EVOLVE_PREDATORS',
                name: "Evolve Predators",
                cost: 60,
                description: "The hunt begins.",
                lore: "To grow, one must consume. To survive, one must be swift.",
                tip: "High WRATH and CHAOS gain. Increases evolution speed through strife.",
                domainPoints: { WRATH: 3, CHAOS: 2 },
                effects: { "hostility": 5 }
            },
            {
                id: 'EVOLVE_FLORA',
                name: "Great Blooms",
                cost: 45,
                description: "Floral dominance.",
                lore: "Beauty is a weapon of propagation.",
                tip: "Boosts LIFE and ORDER. Increases world vibrancy.",
                domainPoints: { LIFE: 4, ORDER: 1 },
                effects: { "hydration": 5, "hostility": -2 }
            },
            {
                id: 'PRIMORDIAL_SOUP',
                name: "Primordial Soup",
                cost: 55,
                description: "Enrich the seas.",
                lore: "The chemistry of magic starts here.",
                tip: "Increases LIFE and CHAOS. Boosts population growth potential.",
                domainPoints: { LIFE: 3, CHAOS: 3 },
                effects: { "population": 250, "hydration": 5 }
            }
        ]
    },
    [Eras.CIVILIZATION]: {
        name: "Era of Awakening",
        description: "Consciousness arises. They look to the sky and name you.",
        nextEraThreshold: Infinity,
        statLabel: "Faith",
        actions: [
            {
                id: 'INSPIRE_WORSHIP',
                name: "Inspire Worship",
                cost: 10,
                description: "Demonstrate your power to gain faith.",
                lore: "Hear their prayers, feigned or true.",
                tip: "Consumes a small amount of power to generate rapid Essence/Power over time.",
                effects: { "power": 30 }
            },
            {
                id: 'CONSTRUCT_WONDER',
                name: "Construct Wonder",
                cost: 100,
                description: "A monument to your glory.",
                lore: "A stone finger pointing at the creator.",
                tip: "Massively reduces hostility and boosts Order. Restricted to The Architect.",
                requiredArchetype: "BUILDER",
                effects: { "hostility": -10, "stats": { "culture": 10 } }
            },
            {
                id: 'INCITE_CONQUEST',
                name: "Incite Conquest",
                cost: 80,
                description: "War feeds your power.",
                lore: "Their blood is the lubricant of progress.",
                tip: "Slightly reduces population but provides a massive burst of Power. Restricted to The Warlord.",
                requiredArchetype: "WARMONGER",
                effects: { "population": -50, "power": 200 }
            },
            {
                id: 'BLESS_HARVEST',
                name: "Bless Harvest",
                cost: 60,
                description: "Bountiful crops for your people.",
                lore: "Their bellies are full, their hearts are yours.",
                tip: "Greatly increases population and reduces hostility. Restricted to The Lifebringer.",
                requiredArchetype: "FERTILITY",
                effects: { "population": 200 }
            }
        ]
    }
};
