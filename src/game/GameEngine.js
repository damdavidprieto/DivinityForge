
import GodArchetypes from './GodArchetypes';
import { Eras, EraConfig } from './EraDefinitions';

const GameEngine = {
    initialState: () => ({
        god: {
            alignment: 0,
            power: 100,
            name: "Unknownity",
            archetype: null, // Determined later
            domainPoints: {
                ORDER: 0, CHAOS: 0, LIFE: 0, WRATH: 0, KNOWLEDGE: 0
            }
        },
        planet: {
            population: 0, // Starts at 0 in Primordial Era
            hostility: 50, // Hostile world
            atmosphere: "void",
            stats: {
                temperature: 0,
                hydration: 0
            }
        },
        era: Eras.PRIMORDIAL,
        events: []
    }),

    tick: (state) => {
        const eraData = EraConfig[state.era];

        // Base Power Generation
        let powerGain = state.god.archetype ? 2 : 1;

        // Planet Physics
        let popChange = 0;
        let newHostility = state.planet.hostility;
        let newEvents = [...state.events];

        // Random Event System
        if (Math.random() < 0.05) { // 5% chance per tick
            const eventTrigger = Math.random();
            if (eventTrigger < 0.3 && state.planet.hostility > 70) {
                newEvents = [{ text: "The world's rage manifests as a violent storm.", type: "wrath" }, ...newEvents];
                newHostility += 2;
            } else if (eventTrigger < 0.1 && state.god.power > 1000) {
                newEvents = [{ text: "Divine resonance attracts celestial echoes.", type: "action" }, ...newEvents];
                powerGain += 50;
            }
        }

        let newPower = Math.min(5000, state.god.power + powerGain);

        // Era Specific Logic
        if (state.era === Eras.LIFE || state.era === Eras.CIVILIZATION) {
            // Life needs specific environmental conditions
            if (state.planet.stats.temperature > 10 && state.planet.stats.temperature < 90 && state.planet.stats.hydration > 10) {
                const growthFactor = (state.god.domainPoints.LIFE * 5);
                popChange = Math.max(1, Math.floor(state.planet.population * 0.01) + growthFactor);
            } else {
                if (state.planet.population > 0) popChange = -Math.ceil(state.planet.population * 0.05);
            }
            newHostility = Math.max(0, state.planet.hostility - 0.05);
        }

        // Apply Archetype Passives
        if (state.god.archetype) {
            const arch = GodArchetypes[state.god.archetype];
            if (arch) {
                newPower += (arch.passives.powerGen || 0);
                if (arch.passives.hostilityChange) newHostility += arch.passives.hostilityChange;
            }
        }

        return {
            ...state,
            god: { ...state.god, power: newPower },
            planet: {
                ...state.planet,
                population: Math.max(0, state.planet.population + popChange),
                hostility: Math.min(100, Math.max(0, newHostility))
            },
            events: newEvents.slice(0, 10)
        };
    },

    processAction: (state, action) => {
        let newState = {
            ...state,
            god: { ...state.god, domainPoints: { ...state.god.domainPoints } },
            planet: { ...state.planet, stats: { ...state.planet.stats } }
        };
        const eraData = EraConfig[state.era];

        // 1. Generic Era Action Handler (from EraDefinitions)
        const actionDef = eraData.actions.find(a => a.id === action.type);
        if (actionDef) {
            if (newState.god.power >= actionDef.cost) {
                newState.god.power -= actionDef.cost;

                // Add Domain Points
                if (actionDef.domainPoints) {
                    Object.keys(actionDef.domainPoints).forEach(domain => {
                        newState.god.domainPoints[domain] = (newState.god.domainPoints[domain] || 0) + actionDef.domainPoints[domain];
                    });
                }

                // Apply Planet/God Effects
                if (actionDef.effects) {
                    Object.keys(actionDef.effects).forEach(key => {
                        if (key === 'population' || key === 'hostility') {
                            newState.planet[key] += actionDef.effects[key];
                        } else if (key === 'power') {
                            newState.god.power += actionDef.effects[key];
                        } else if (key === 'atmosphere') {
                            newState.planet[key] = actionDef.effects[key];
                        } else {
                            // Assume simplified stats for now
                            if (!newState.planet.stats) newState.planet.stats = {};
                            newState.planet.stats[key] = (newState.planet.stats[key] || 0) + actionDef.effects[key];
                        }
                    });
                }

                newState.events = [{ text: `You use ${actionDef.name}.`, type: "action" }, ...newState.events].slice(0, 10);
            }
            return newState;
        }

        // 2. Special System Actions
        switch (action.type) {
            case 'ADVANCE_ERA':
                if (state.era === Eras.PRIMORDIAL) {
                    newState.era = Eras.LIFE;
                    newState.events = [{ text: "The Primordial Chaos settles. Life begins to stir.", type: "era-change" }, ...newState.events];
                } else if (state.era === Eras.LIFE) {
                    newState.era = Eras.CIVILIZATION;
                    // Determine Archetype here!
                    const newArchetype = GameEngine.determineArchetype(newState.god.domainPoints);
                    newState.god.archetype = newArchetype;
                    newState.events = [{ text: `Civilization rises! You are known as ${GodArchetypes[newArchetype].name}.`, type: "era-change" }, ...newState.events];
                }
                break;
        }

        return newState;
    },

    determineArchetype: (points) => {
        // Logic to choose archetype based on max points
        let maxDomain = "NEUTRAL";
        let maxVal = -1;

        Object.entries(points).forEach(([domain, val]) => {
            if (val > maxVal) {
                maxVal = val;
                maxDomain = domain;
            }
        });

        // Map Domain to Archetype
        const mapping = {
            'ORDER': 'BUILDER',
            'CHAOS': 'TRICKSTER',
            'WRATH': 'WARMONGER',
            'LIFE': 'FERTILITY',
            'KNOWLEDGE': 'KNOWLEDGE'
        };

        return mapping[maxDomain] || 'NEUTRAL';
    }
};

export default GameEngine;
