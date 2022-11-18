import {
  searchLocalQueue,
  searchLocalWatch,
  classListWatch,
  classListQueue,
  addLocal,
} from './add_local_storage';
import { fetchFilms } from './API/fetchSearchMovie';
import {
  makeFilmModalMarkup,
  onBackdropClick,
  onEscBtnPress,
} from './modal_film';
import {
  processingGenre,
  processingNameFilm,
  processingPoster,
  processingVoteAverage,
} from './renderMoviesTrending';
import {
  page,
  backdropEl,
  modalFilm,
  cardListSearch,
  searchFilmInput,
  searchFilmForm,
} from './refs';
import Notiflix from 'notiflix';

searchFilmInput.addEventListener('input', liveSearch(searchFilmInput.value));

export async function liveSearch(inputValue) {
  let searchTopList = [];
  if (inputValue.length > 2) {
    cardListSearch.classList.remove('is-hidden');
    searchTopList = await fetchFilms(inputValue, page);
    if (searchTopList.length === 0) {
      Notiflix.Notify.failure(
        'Search result not successful. Enter the correct movie name and try again.'
      );
      return;
    }

    cardListSearch.insertAdjacentHTML(
      'afterbegin',
      makeTopList(searchTopList.slice(0, 5))
    );
  }

  async function clickModal(e) {
    if (searchTopList.length > 0) {
      let clickMovie = await searchTopList.find(list => list.id == e.target.id);

      if (document.querySelector('.film__image') !== null) {
        document.querySelector('.film__image').remove();
        document.querySelector('.film__information').remove();
      }
      backdropEl.classList.remove('is-hidden');
      modalFilm.classList.remove('is-hidden');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', onEscBtnPress);
      document.addEventListener('click', onBackdropClick);

      let poster_path = processingPoster(clickMovie.poster_path);
      let title = processingNameFilm(clickMovie.title, clickMovie.name);
      let vote_average = processingVoteAverage(clickMovie.vote_average);
      let vote_count = clickMovie.vote_count;
      let popularity = clickMovie.popularity;
      let genre_ids = processingGenre(clickMovie.genre_ids);
      let overview = clickMovie.overview;
      let btn_search = '';

      modalFilm.insertAdjacentHTML(
        'afterbegin',
        makeFilmModalMarkup(
          poster_path,
          title,
          vote_average,
          vote_count,
          popularity,
          genre_ids,
          overview,
          btn_search
        )
      );

      const obj = addLocal(clickMovie);

      const btnWatch = document.querySelector('.btn__watch');
      const btnQueue = document.querySelector('.btn__queue');

      btnWatch.classList.remove('btn__watch__remove');
      btnQueue.classList.remove('btn__queue__remove');
      searchLocalQueue(obj, btnQueue, btnWatch);
      searchLocalWatch(obj, btnWatch, btnQueue);
      btnWatch.addEventListener('click', e => {
        classListWatch(btnWatch, obj);
      });
      btnQueue.addEventListener('click', () => {
        classListQueue(btnQueue, obj);
      });
      cardListSearch.innerHTML = '';
      cardListSearch.classList.add('is-hidden');
      cardListSearch.removeEventListener('click', clickModal);
      searchFilmForm.reset();
    }
  }

  cardListSearch.addEventListener('click', clickModal);
}

function makeTopList(topList) {
  let markup = '';
  topList.forEach(element => {
    markup += `
    <li class="card_small" id="${element.id}" data-index="card-small">
    <h2 class="card-title small" id="${element.id}">
      ${processingNameFilm(element.title, element.name)} 
    ${
      processingGenre(element.genre_ids).length !== 0
        ? `[ ${processingGenre(element.genre_ids)} ]`
        : ` [No information about the genre] `
    }
    </h2>
    <p class="card-vote small is-visible" id="${
      element.id
    }">${processingVoteAverage(element.vote_average)}</p>
  </li>`;
  });
  return markup;
}
