export const fetchSuccessGifs = gifsData => {
    return {
        type: 'FETCH_SUCCESS_GIFS',
        payload: {
            data: Array.isArray(gifsData) ? gifsData.map(g => ({
                ...g, image_url: g.images.fixed_width.webp
            })) : [gifsData]
        }
    }
};

export const clearGifs = () => {
    return {
        type: 'CLEAR_GIFS'
    }
};