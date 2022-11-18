import {
  page,
  cardListSearch,
  searchFilmForm,
  searchFilmInput,
  moviesElement,
} from './refs';
import { pagination } from './pagination';
import { fetchMoviesTrending } from './API/fetchMoviesTrending';
import { fetchFilms } from './API/fetchSearchMovie';
import { onScroll, onToTopBtn } from './scroll';
import { renderMoviesTrending } from './renderMoviesTrending';
import Notiflix from 'notiflix';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import debounce from 'lodash.debounce';
import { liveSearch } from './liveSearch';

import { renderMoviesTrending } from './renderMoviesTrending';

let inputValue = '';
let searchFilms = true;
let answer = null;

async function searchFilm(e) {
  e.preventDefault();

  inputValue = searchFilmInput.value;
  cardListSearch.classList.add('is-hidden');
  if (inputValue === '') {
    Notiflix.Notify.failure('Enter the correct movie name and try again.');
    return;
  }
  searchFilmForm.reset();
  try {
    answer = await fetchFilms(inputValue, page);
    if (answer.length === 0) {
      Loading.remove();
      Notiflix.Notify.failure(
        'Search result not successful. Enter the correct movie name and try again.'
      );
      return;
    }
    searchFilms = false;
    moviesElement.innerHTML = '';
    await renderMoviesTrending(answer);
  } catch (error) {
    console.error(error);
  }
}

pagination.on('afterMove', event => {
  const currentPage = event.page;
  moviesElement.innerHTML = '';
  if (searchFilms) {
    renderMoviesTrending(fetchMoviesTrending(currentPage));
  } else {
    renderMoviesTrending(fetchFilms(inputValue, currentPage));
  }
  onScroll();
  onToTopBtn();
});

function debouceFunct() {
  inputValue = handleKeyPress();
  if (inputValue !== '') {
    cardListSearch.innerHTML = '';
    liveSearch(inputValue);
  } else {
    cardListSearch.classList.add('is-hidden');
  }
}

const handleKeyPress = event => {
  return searchFilmInput.value.trim();
};

searchFilmForm.addEventListener('input', debounce(debouceFunct, 500));
searchFilmForm.addEventListener('submit', searchFilm);
