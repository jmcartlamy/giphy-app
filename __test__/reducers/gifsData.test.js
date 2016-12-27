import reducer from '../../src/reducers/gifsData.js';

test('initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
});

test('FETCH_SUCCESS_GIFS', () => {
    const state = [];
    Object.freeze(state);

    const actions = {
        type: 'FETCH_SUCCESS_GIFS',
        payload: {
            data: [ { url: 'testtest' } ]
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual([ { url: 'testtest' } ])
});

test('CLEAR_GIFS', () => {
    const state = [{ bob: 'test', rtee: 'rhtrez', rerzez: { gregr: 'test'}}];
    Object.freeze(state);

    const actions = {
        type: 'CLEAR_GIFS',
        payload: {
            data: []
        }
    };

    expect(
        reducer(state, actions)
    ).toEqual([])
});