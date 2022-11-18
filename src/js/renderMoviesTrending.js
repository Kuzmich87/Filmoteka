import { card } from './oneCard';
import { getMovieGenres } from './API/genres';
import { container, BASE_URL_IMAGE } from './refs';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

///////////////Елемент одной карточки в HTML документе
const moviesElement = document.querySelector('.movies');
const messageElement = document.querySelector('.info-message');

////////////////Путь и размер запроса картинок + заглушка картинки
let fileSize = 'w400';

let stubPicture =
  'https://raw.githubusercontent.com/kovAnya/project-team-2/main/src/images/placeholder/no-image_desktop.webp';

///////////////////////////////////////////////

///////////////////////////////////////Функция которая берет только год из данных с сервера
export function processingReleasedYear(release_date, first_air_date) {
  if (release_date) {
    /// Если в данных есть значение release_date то данный год берем с него
    let ReleasedData = release_date.split('');
    return ReleasedData.splice(0, 4).join('');
  } else if (first_air_date) {
    let ReleasedData = first_air_date.split(''); /// Если нет release_date то берем год с first_air_date
    return ReleasedData.splice(0, 4).join('');
  } else {
    return '';
  }
}
//////////////////////////////////////////////////

////////////////////////////////////////////////////Функция проверяет есть ли фото в ответе от сервера

export function processingPoster(poster_path) {
  if (poster_path) {
    return `${BASE_URL_IMAGE}/${fileSize}/${poster_path}`;
  } else {
    return stubPicture;
  }
}

/////////////////////////////////////////////////////Функция которая id жанров превращает в название жанров
export function processingGenre(genre_ids) {
  let genres = [];

  for (const ids of genre_ids) {
    if (getMovieGenres(ids)) {
      let genre = getMovieGenres(ids);
      /// Если id жанра есть в списке жанров то добавляем в карточку, если нет то не добавляем
      genres.push(` ${genre}`);
    }
  }

  return genres;
}

/////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////Функция возврата названия фильма из данных с сервера
export function processingNameFilm(title, name) {
  if (title) {
    /// Название фильма берем с title
    return title;
  } else if (name) {
    return name; //// Если нет title в данных то берем с name
  } else {
    return 'Название фильма не найденно';
  }
}
//////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////Функция бработки рейтинга
export function processingVoteAverage(vote_average) {
  if (vote_average) {
    return vote_average.toFixed(1);
  } else {
    return '0';
  }
}

///////////////////////////////////Данные с сервира закидываем в Локальное хранилище
export async function saveInLocalStorage(dataFromServer) {
  let data = await dataFromServer;
  let dataJSON = JSON.stringify(data);

  localStorage.setItem('dataInApi', dataJSON);
}
///////////////////////////////////////////////////////////////////

///////////////Функция рендеринга 1 карточки фильма
export async function renderMoviesTrending(dataFromServer) {
  Loading.hourglass({
    svgColor: 'rgb(255, 106, 0)',
    backgroundColor: 'rgba(0,0,0,0)',
  });
  try {
    let data = await dataFromServer; ////Массив с 20 фильмами
    if (!data || data.length === 0) {
      messageElement.innerHTML =
        "<p class = 'info-message'>You haven't added any movies yet. Please use search to find relevant movies</p>";
      Loading.remove();
      return;
    } else {
      messageElement.innerHTML = '';
    }

    if (!data || data.length === 0) {
      container.classList.add('visually-hidden');
    } else if (data.length < 20) {
      container.classList.add('visually-hidden');
    }

    saveInLocalStorage(dataFromServer);

    data.map(
      (
        {
          poster_path,
          title,
          name,
          genre_ids,
          release_date,
          first_air_date,
          id,
          vote_average,
        } ////Перебираем каждый фильм и берем данные
      ) => {
        let poster = ''; ////Картинка фильма
        let genres = []; /// Жанры фильма
        let releasedYear = ''; /// Год релиза
        let cardFilm = ''; /// Обьявление переменной для карточки фильма
        let nameFilm = '';
        let voteAverage = '';
        poster = processingPoster(poster_path);
        releasedYear = processingReleasedYear(release_date, first_air_date);
        genres = processingGenre(genre_ids);
        nameFilm = processingNameFilm(title, name);
        voteAverage = processingVoteAverage(vote_average);

        cardFilm = card(
          poster,
          nameFilm,
          genres,
          releasedYear,
          id,
          voteAverage
        );

        moviesElement.insertAdjacentHTML('beforeend', cardFilm); /// Добавляем сформированную карточку в HTML код
      }
    );
  } catch (error) {
    console.error(error);
  }
  Loading.remove();
}
