import modalController from './modules/modal.js';
import { setProfile, getProfile } from './modules/profile.js';
import { handlerImage, setCard, getCards } from './modules/cards.js';
import updatePhotoNodeList from './helper/updatePhotoNodeList.js';

modalController({
	modal: '.modal-profile',
	btnOpen: '.profile__editor',
	btnClose: '.modal-profile__close',
});

modalController({
	modal: '.modal-card',
	btnOpen: '.profile__add-card',
	btnClose: '.modal-card__close',
});

window.onload = () => {
	getProfile();
	getCards();
	handlerImage();
	updatePhotoNodeList();
};

const saveProfileBtn = document.querySelector('.modal-profile__save');
saveProfileBtn.addEventListener('click', setProfile);

const addCardBtn = document.querySelector('.modal-card__save');
addCardBtn.addEventListener('click', () => {
	setCard();
	updatePhotoNodeList();
});
