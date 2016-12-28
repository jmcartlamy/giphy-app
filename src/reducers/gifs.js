export const initialState = {
    loaded: false,
    data: []
};

function gifsDataReducer(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_SUCCESS_GIFS':
            return {
                data: action.payload.data,
                loaded: true
            };
        case 'CLEAR_GIFS':
            return {
                data: [],
                loaded: false
            };
        default:
            return state
    }

}

export default gifsDataReducer;