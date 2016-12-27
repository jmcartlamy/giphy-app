
function gifsFavouritesReducer(state = [], action) {

    switch (action.type) {
        case 'ADD_GIF':
            return state.concat([action.payload.id]);
        case 'REMOVE_GIF':
            return state.filter(id => id !== action.payload.id);
        default:
            return state
    }

}

export default gifsFavouritesReducer;