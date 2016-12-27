import reducer from '../../src/reducers/gifsLoaded.js';

test('initial state', () => {
    expect(reducer(undefined, { type: 'RANDOM' })).toBe(false);
});

test('GIFS_LOADED', () => {
    expect(
        reducer(false, { type: 'GIFS_LOADED' })
    ).toBe(true);
});

test('GIFS_UNLOADED', () => {
    expect(
        reducer(true, { type: 'GIFS_UNLOADED' })
    ).toBe(false);
});