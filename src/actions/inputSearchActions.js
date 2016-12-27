export const userInput = inputStr => {
    return {
        type: 'USER_INPUT',
        payload: {
            input: inputStr
        }
    }
};

export const clearInput = () => {
    return {
        type: 'CLEAR_INPUT'
    }
};