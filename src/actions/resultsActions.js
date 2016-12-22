export const fetchSuccessGifs = gifsData => {
    return {
        type: 'FETCH_SUCCESS_GIFS',
        payload: {
            data: gifsData
        }
    }
};

export const clearGifs = () => {
    return {
        type: 'CLEAR_GIFS'
    }
};