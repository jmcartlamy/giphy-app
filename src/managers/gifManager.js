import localStorage from '../app/localStorage';

import { toggleFavGif, fixedHeightOverlay } from '../modules/favourites';

import { NAME_LS_FAVOURITES } from '../constants/gifs';

export default {

    process(response) {

        if(response.data.meta.status === 200) {

            let favs = localStorage.getItemLS(NAME_LS_FAVOURITES),
                data = response.data.data,
                gifs = [];

            for( let key in data) {

                let idData = data[key].id, checked = '';

                for ( let idFav of favs ) {
                    if (idFav === idData) {
                        checked = 'checked';
                        break;
                    }
                }
                gifs.push({
                    id: idData,
                    src: data[key].images.fixed_width.webp,
                    checked: checked
                });
            }
            this.render(gifs);
        }
    },

    processToRandom(response) {

        if(response.data.meta.status === 200) {

            let favs = localStorage.getItemLS(NAME_LS_FAVOURITES),
                gifs = [],
                data = response.data.data,
                checked = '';

            for ( let idFav of favs ) {
                if (idFav === data.id) {
                    checked = 'checked';
                    break;
                }
            }
            gifs.push({
                id: data.id,
                src: data.image_url,
                checked: checked
            });
            this.render(gifs);

        }
    },
    render(content) {

        let el = document.querySelector('#results');

        if (content.length === 0) {
            el.classList.remove("results-column");
            el.innerHTML = 'Nothing found here.';

        } else {

            if (content.length > 1) {
                el.classList.add("results", "results-column");
            } else {
                el.classList.add("results");
            }

            let imgTags = content
                .map(data => `<div><div><span data-id="${data.id}" class="${data.checked}">&#9734;</span></div><img src="../assets/loading.svg" /></div>`)
                .join('');

            el.innerHTML = imgTags;

            let images = el.querySelectorAll('#results > div > img');

            for (let i = 0; i < content.length; i+=1) {
                let downloadingImage = new Image();

                downloadingImage.onload = (e) => {
                    images[i].src = e.target.src;
                    images[i].setAttribute("style", "width: " + 100 +"%");

                    fixedHeightOverlay(images[i]);
                };

                downloadingImage.src = content[i].src;

                toggleFavGif(images[i].previousSibling.firstChild);
            }
        }

    }

};