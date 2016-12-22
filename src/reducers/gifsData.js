
function gifsDataReducer(state = [], action) {

    switch (action.type) {
        case 'FETCH_SUCCESS_GIFS':
            return action.payload.data;
        case 'CLEAR_GIFS':
            return [];
        default:
            return state
    }

}

export default gifsDataReducer;