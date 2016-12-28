import reducer, {initialState} from '../../src/reducers/gifs.js';

test('initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
});

test('FETCH_SUCCESS_GIFS', () => {
    const state = {
        loaded: false,
        data: []
    };
    Object.freeze(state);

    const actions = {
        type: 'FETCH_SUCCESS_GIFS',
        payload: {
            data: [ { url: 'testtest' } ]
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual({
        loaded: true,
        data: [ { url: 'testtest' } ]
    })
});

test('CLEAR_GIFS', () => {
    const state = {
        loaded: true,
        data: [{ bob: 'test', rtee: 'rhtrez', rerzez: { gregr: 'test'}}]
    };
    Object.freeze(state);

    const actions = {
        type: 'CLEAR_GIFS',
        payload: {
            data: []
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual({
        loaded: false,
        data: []
    })
});