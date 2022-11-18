import { localStorageUs } from './localStorage';
const WATCH_KEY = 'Watched';
const QUEUE_KEY = 'Queue';
let arrWatch = [];
let arrQueue = [];

function onWatchedBtnClick(obj) {
  const checkWatch = localStorage.getItem(WATCH_KEY);
  if (checkWatch) {
    arrWatch = JSON.parse(checkWatch);
  }

  const filmWatch = arrWatch.find(array => array.id === obj.id);

  if (filmWatch) {
    return;
  }
  arrWatch.push(obj);
  localStorageUs.save(WATCH_KEY, arrWatch);
  return arrWatch;
}

function onQueueBtnClick(obj) {
  const checkQueue = localStorage.getItem(QUEUE_KEY);
  if (checkQueue) {
    arrQueue = JSON.parse(checkQueue);
  }

  const filmQueue = arrQueue.find(array => {
    array.id === obj.id;
  });

  if (filmQueue) {
    return;
  }
  arrQueue.push(obj);
  localStorageUs.save(QUEUE_KEY, arrQueue);
  return arrQueue;
}
export function deleteLocalWatch(obj) {
  const checkWatch = localStorage.getItem(WATCH_KEY);
  const checkkk = JSON.parse(checkWatch);
  const filmWatched = checkkk.filter(array => {
    return array.id != obj.id;
  });
  localStorage.setItem(WATCH_KEY, JSON.stringify(filmWatched));
}
export function deleteLocalQueue(obj) {
  const checkWatch = localStorage.getItem(QUEUE_KEY);
  const checkkk = JSON.parse(checkWatch);
  const filmQueue = checkkk.filter(array => {
    return array.id !== obj.id;
  });
  localStorage.setItem(QUEUE_KEY, JSON.stringify(filmQueue));
}
export function classListWatch(btnWatch, obj) {
  if (btnWatch.classList.contains('btn__watch')) {
    btnWatch.classList.add('btn__watch__remove');
    btnWatch.classList.add('active');
    btnWatch.classList.remove('btn__watch');
    btnWatch.textContent = 'REMOVE FROM WATCHED';
    onWatchedBtnClick(obj);
  } else if (btnWatch.classList.contains('btn__watch__remove')) {
    btnWatch.classList.add('btn__watch');
    btnWatch.classList.remove('btn__watch__remove');
    btnWatch.classList.remove('active');
    btnWatch.textContent = 'ADD TO WATCHED';
    deleteLocalWatch(obj);
  }
}
export function classListQueue(btnQueue, obj) {
  if (btnQueue.classList.contains('btn__queue')) {
    btnQueue.classList.add('btn__queue__remove');
    btnQueue.classList.remove('btn__queue');
    btnQueue.classList.add('active');
    btnQueue.textContent = 'REMOVE FROM QUEUE';
    onQueueBtnClick(obj);
  } else if (btnQueue.classList.contains('btn__queue__remove')) {
    btnQueue.classList.add('btn__queue');
    btnQueue.classList.remove('btn__queue__remove');
    btnQueue.classList.remove('active');
    btnQueue.textContent = 'ADD TO QUEUE';
    deleteLocalQueue(obj);
  }
}
export function searchLocalWatch(obj, btnWatch) {
  try {
    const checkWatch = localStorage.getItem(WATCH_KEY);
    const checkkk = JSON.parse(checkWatch);
    if (!checkkk) {
      return;
    }
    const filmWatched = checkkk.find(array => array.id === obj.id);
    if (filmWatched) {
      btnWatch.classList.remove('btn__watch');
      btnWatch.classList.toggle('btn__watch__remove');
      btnWatch.classList.add('active');

      btnWatch.textContent = 'REMOVE FROM WATCHED';
    }
  } catch (error) {
    console.log(error);
  }
}
export function searchLocalQueue(obj, btnQueue) {
  try {
    const checkQueue = localStorage.getItem(QUEUE_KEY);
    const checkkk = JSON.parse(checkQueue);
    if (!checkkk) {
      return;
    }
    const filmQueue = checkkk.find(array => array.id === obj.id);
    if (filmQueue) {
      btnQueue.classList.add('active');
      btnQueue.classList.add('btn__queue__remove');
      btnQueue.classList.remove('btn__queue');
      btnQueue.textContent = 'REMOVE FROM QUEUE';
    }
  } catch (error) {
    console.log(error);
  }
}

export function objInfo(obj) {
  const genres_ids = obj.genres_ids;
}

export { onWatchedBtnClick, onQueueBtnClick };
export function addLocal(obj) {
  const id = obj.id;
  const poster_path = obj.poster_path;
  const name = obj.name;
  const genre_ids = obj.genre_ids;
  const release_date = obj.release_date;
  const first_air_date = obj.first_air_date;
  const title = obj.title;
  const vote_average = obj.vote_average;
  const popularity = obj.popularity;
  const vote_count = obj.vote_count;
  const overview = obj.overview;
  return {
    poster_path,
    title,
    name,
    genre_ids,
    release_date,
    first_air_date,
    id,
    vote_average,
    popularity,
    vote_count,
    overview,
  };
}
