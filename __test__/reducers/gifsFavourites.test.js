import reducer from '../../src/reducers/gifsFavourites.js';

test('initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
});

test('ADD_GIF with empty array', () => {
    const state = [];
    Object.freeze(state);

    const actions = {
        type: 'ADD_GIF',
        payload: {
            id: "29842904529"
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual([ "29842904529" ])
});

test('ADD_GIF with already data', () => {
    const state = ["29842904529"];
    Object.freeze(state);

    const actions = {
        type: 'ADD_GIF',
        payload: {
            id: "987656678"
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual([ "29842904529", "987656678" ])
});

test('REMOVE_GIF', () => {
    const state = ["29842904529", "987656678", "1A"];
    Object.freeze(state);

    const actions = {
        type: 'REMOVE_GIF',
        payload: {
            id: "1A"
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual([ "29842904529", "987656678" ])
});
