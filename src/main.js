import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from "./js/pixabay-api";
import { photosTemplate } from "./js/render-functions";

let lightbox = new SimpleLightbox(".gallery-item a", {
    captionsData: 'alt',
    captionDelay: 250,
});

const refs = {
    gallery: document.querySelector(".gallery"),
    searchMenu: document.querySelector(".search-menu"),
    searchBtn: document.querySelector(".search-btn"),
    searchInput: document.querySelector(".search-input"),
    loader: document.querySelector(".loader"),
};

refs.searchMenu.addEventListener("submit", (event) => {
    event.preventDefault();
    const wordKey = refs.searchInput.value.trim();
    if (!wordKey) {
        return;
    }
    refs.gallery.innerHTML = "";
    refs.searchInput.value = "";
    refs.loader.style.display = "inline-block";
    getImages(wordKey)
        .then((images) => {
            if (images.length === 0) {
                iziToast.error({
                    message: "Sorry, there are no images matching your search query. Please try again!",
                    position: "topRight",
                });
                refs.gallery.innerHTML = "";  
            } else {
                refs.gallery.innerHTML = photosTemplate(images);
                lightbox.refresh();
            }
        })
        .catch((err) => {
            console.error(err);
            refs.gallery.innerHTML = "";
        })
        .finally(() => {
            refs.loader.style.display = "none";
        });
});
