
function userInputReducer(state = '', action) {

    switch (action.type) {
        case 'USER_INPUT':
            return action.payload.input;
        case 'CLEAR_INPUT':
            return '';
        default:
            return state
    }

};

export default userInputReducer;