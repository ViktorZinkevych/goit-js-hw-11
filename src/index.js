// Описан в документации
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix, { Notify } from 'notiflix';

import { UnsplashAPI } from "./unsplash-api";
import markupGalleryEL from './templates/gallery-card.hbs'

const searchFormEl = document.querySelector('#search-form');
const galleryListEl = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const inputEl = document.querySelector('input[name="searchQuery"]');
// console.dir(inputEl);
const unsplashApi = new UnsplashAPI();






const handleSearchFormSubmit = async event => {
    event.preventDefault();

    const searchQuery = inputEl.value.trim();
    unsplashApi.q = searchQuery;

    try{
        const { data } = await unsplashApi.fetchPhotos();

        if(data.total === 0) {
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            return;
        }
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        galleryListEl.innerHTML = markupGalleryEL(data.hits);
        loadMoreBtn.classList.remove('is_hidden');

    } catch (err) {
        console.log(err);
    }

};

const handleLoadMoreBtnClick = async () => {
    unsplashApi.page += 1;

    try{
        const { data } = await unsplashApi.fetchPhotos();

        if(unsplashApi.page === data.totalHits) {
            loadMoreBtn.classList.add('is_hidden');
            Notify.info( "We're sorry, but you've reached the end of search results.");
        }
       
       
        galleryListEl.insertAdjacentHTML("beforeend", markupGalleryEL(data.hits));

        
    } catch(err) {
        console.log(err);
    }
};

galleryListEl.addEventListener('click',handleGalleryClick);

function handleGalleryClick(event) {
    event.preventDefault()
    
    if(event.target.nodeName !== 'IMG'){
        return
    }
    // const modalImg = event.target.dataset.lightbox;
    // console.log(modalImg);

   

}

import SimpleLightbox from "simplelightbox";
let gallery = new SimpleLightbox('.gallery a', {
    captionSelector: 'img',
    captionsData: 'all',
    captionPosition: 'bottom',
    captionDelay: 250,
    scrollZoom: false,
});
gallery.on('show.simplelightbox', function () {});
gallery.on('error.simplelightbox', function (event) {
	console.log(event);
});





searchFormEl.addEventListener('submit', handleSearchFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);