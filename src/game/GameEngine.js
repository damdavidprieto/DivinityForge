
const GameEngine = {
    initialState: () => ({
        god: {
            alignment: 0, // -100 to 100
            power: 100,
            name: "Unknownity"
        },
        planet: {
            population: 1000,
            hostility: 10,
            atmosphere: "calm"
        },
        events: []
    }),

    tick: (state) => {
        // Basic resource generation and decay
        const newPower = Math.min(1000, state.god.power + 1);
        const popChange = Math.floor(state.planet.population * 0.001);

        return {
            ...state,
            god: { ...state.god, power: newPower },
            planet: { ...state.planet, population: state.planet.population + popChange }
        };
    },

    processAction: (state, action) => {
        let newState = { ...state };
        if (action.type === 'SMITE') {
            newState.god.power -= 50;
            newState.planet.population = Math.max(0, newState.planet.population - 100);
            newState.events = [{ text: "You smite the earth!", type: "wrath" }, ...newState.events].slice(0, 10);
        }
        return newState;
    }
};

export default GameEngine;
