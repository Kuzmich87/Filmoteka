export const ApiKey = '3ec430a354e7116e3d9f9a41b82b2275';
export let page = 1;
export let BASE_URL_IMAGE = 'https://image.tmdb.org/t/p';
export const BASE_URL_TO_QUERY_GENRES =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=';

export const LOCAL_KEY_GENRES = 'genresOfFilms';
const refs = {
  toTopBtn: document.querySelector('.btn-to-top'),
  modalBackdrop: document.querySelector('.modal-backdrop'),
  headerLogIn: document.querySelector('.header-logIn'),
  headerLogOut: document.querySelector('.header-logOut'),
  headerMyLibrary: document.querySelector('#header-myLibrary'),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal-login]'),
  backdropLogIn: document.querySelector('.backdrop_login'),
  modalDivLogIn: document.querySelector('.modal_login'),
  formLogIn: document.querySelector('.modal_login__form'),
  formTitleSignIn: document.querySelector('.modal_login__title_signIn'),
  formTitleSignUp: document.querySelector('.modal_login__title_signUp'),
  formWrapName: document.querySelector('.modal_login__wrap_name'),
  inputPassword: document.querySelector('#password'),
  buttonShowPassword: document.querySelector('#button_show_password'),
  iconForShowPassword: document.querySelector('#icon_show_password'),
  iconForUnShowPassword: document.querySelector('#icon_un_show_password'),
  formWrapCheckbox: document.querySelector('.modal_login__wrap_checkbox'),
  formCheckbox: document.querySelector('#checkbox'),
  buttonRegister: document.querySelector('.modal_login__button_register'),
  buttonConfirm: document.querySelector('.modal_login__button_confirm'),
  signUp: document.querySelector('.signUp_now'),
  signUpLink: document.querySelector('.signUp_now__link'),
  signIn: document.querySelector('.signIn_now'),
  signInLink: document.querySelector('.signIn_now__link'),
  logOut: document.querySelector('#header-logOut'),
  playSomething: document.querySelector('.header-playsomething'),
  cardListSearch: document.querySelector('[data-index="card-list"]'),
  searchFilmForm: document.querySelector('.header__form'),
  searchFilmInput: document.querySelector('.header__form-input'),
  moviesElement: document.querySelector('.movies'),
};
export const {
  toTopBtn,
  modalBackdrop,
  headerLogIn,
  headerLogOut,
  headerMyLibrary,
  openModalBtn,
  closeModalBtn,
  modal,
  backdropLogIn,
  modalDivLogIn,
  formLogIn,
  formTitleSignIn,
  formTitleSignUp,
  formWrapName,
  inputPassword,
  buttonShowPassword,
  iconForShowPassword,
  iconForUnShowPassword,
  formWrapCheckbox,
  formCheckbox,
  buttonRegister,
  buttonConfirm,
  signUp,
  signUpLink,
  signIn,
  signInLink,
  logOut,
  playSomething,
  cardListSearch,
  searchFilmForm,
  searchFilmInput,
  moviesElement,
} = refs;

// До футера
export const openModalFooterEl = document.querySelector(
  '[data-team-modal-open]'
);
export const backdropEl = document.querySelector('.backdrop');

// До бібліотеки
export const openWatchedBtn = document.querySelector('.js-watched');
export const openQueueBtn = document.querySelector('.js-queue');

// Для перемикання сторінок

export const bodyElement = document.querySelector('body');

// Модалка
export const filmsListRef = document.querySelector('.movies');
export const closeBtnRef = document.querySelector('.closeModal');
export const modalFilm = document.querySelector('.modal__container');
export const container = document.getElementById('tui-pagination-container');
