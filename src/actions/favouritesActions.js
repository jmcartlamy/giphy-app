export const addGif = idGif => {
    return {
        type: 'ADD_GIF',
        payload: {
            id: idGif
        }
    }
};

export const removeGif = idGif => {
    return {
        type: 'REMOVE_GIF',
        payload: {
            id: idGif
        }
    }
};