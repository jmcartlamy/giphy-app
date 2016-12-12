import axios from 'axios';

import gifManager from '../managers/gifManager';
import localStorage from '../app/localStorage';

import { NAME_LS_FAVOURITES } from '../constants/gifs';
import API_KEY from '../constants/api';

export let request = () => {

    let favs = localStorage.getItemLS(NAME_LS_FAVOURITES);

    axios.get('http://api.giphy.com/v1/gifs', {
        params: {
            api_key: API_KEY,
            ids: favs.toString()
        }
    })
        .then(function (response) {
            gifManager.process(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export let fixedHeightOverlay = (img) => {

        let clientHeight = img.clientHeight;

        if (clientHeight !== 0) {
            img.parentNode.firstChild.setAttribute("style", "height: " + clientHeight + "px");
        }
};

export let toggleFavGif = (button) => {

    button.addEventListener('click', (e) => {

        let favs = localStorage.getItemLS(NAME_LS_FAVOURITES),
            idFav = e.target.dataset.id, // a changer
            favExist = false;

        for (let j = 0; j < favs.length; j+=1) {
            if (favs[j] === idFav) {
                favs.splice(j, 1);
                favExist = true;
            }
        }

        if (favExist === false) {
            favs.push(idFav);
            e.target.classList.add('checked');
        } else {
            e.target.classList.remove('checked');
        }

        localStorage.setItemLS(NAME_LS_FAVOURITES, favs);
    });
};