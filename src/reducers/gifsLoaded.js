
function gifsLoadedReducer(state = false, action) {

    switch (action.type) {
        case 'GIFS_LOADED':
            return true;
        case 'GIFS_UNLOADED':
            return false;
        default:
            return state
    }

}

export default gifsLoadedReducer;