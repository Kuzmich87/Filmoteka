import { fetchMoviesTrending } from './API/fetchMoviesTrending';
import {
  searchLocalQueue,
  searchLocalWatch,
  classListWatch,
  classListQueue,
} from './add_local_storage';
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
import { addLocal } from './add_local_storage';
import { playSomething, page, backdropEl, modalFilm } from './refs';

let MovieList = null;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

async function searchPlaySomething(event) {
  let randomPage = getRandomInt(15);
  event.preventDefault();
  MovieList = await fetchMoviesTrending(randomPage + 1);
  let randomMovie = getRandomInt(20);

  if (document.querySelector('.film__image') !== null) {
    document.querySelector('.film__image').remove();
    document.querySelector('.film__information').remove();
  }
  backdropEl.classList.remove('is-hidden');
  modalFilm.classList.remove('is-hidden');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onEscBtnPress);
  document.addEventListener('click', onBackdropClick);

  let poster_path = processingPoster(MovieList[randomMovie].poster_path);
  let title = processingNameFilm(
    MovieList[randomMovie].title,
    MovieList[randomMovie].name
  );
  let vote_average = processingVoteAverage(MovieList[randomMovie].vote_average);
  let vote_count = MovieList[randomMovie].vote_count;
  let popularity = MovieList[randomMovie].popularity;
  let genre_ids = processingGenre(MovieList[randomMovie].genre_ids);
  let overview = MovieList[randomMovie].overview;
  let btn_search = `<button type="button" class="film__button btn__movie">Next movie</button>`;

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

  const obj = addLocal(MovieList[randomMovie]);

  const btnWatch = document.querySelector('.btn__watch');
  const btnQueue = document.querySelector('.btn__queue');
  const btnMovie = document.querySelector('.btn__movie');

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
  btnMovie.addEventListener('click', searchPlaySomething);
}

playSomething.addEventListener('click', searchPlaySomething);
