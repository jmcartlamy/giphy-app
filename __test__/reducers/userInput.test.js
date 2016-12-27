import reducer from '../../src/reducers/userInput.js';

test('initial state', () => {
    expect(reducer(undefined, { type: 'NOOP' })).toBe('');
});

test('USER_INPUT', () => {
    const state = 'toto';
    const expectedState = 'tutu';
    const action = {
        type: 'USER_INPUT',
        payload: {
            input: 'tutu'
        }
    };
    expect(reducer(state, action)).toBe(expectedState);
});

test('CLEAR_INPUT', () => {
    expect(
        reducer('ldsfkfd', { type: 'CLEAR_INPUT' })
    ).toBe('');
});