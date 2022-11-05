import modalController from './modal.js';

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
