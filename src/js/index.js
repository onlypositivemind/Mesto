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

// Profile
const saveProfileBtn = document.querySelector('.modal-profile__save'),
	userNameElem = document.querySelector('.profile__name'),
	userDescriptionElem = document.querySelector('.profile__description'),
	userImageElem = document.querySelector('[alt = "Profile image"]');

const inputName = document.querySelector('.modal-profile__name'),
	inputDescr = document.querySelector('.modal-profile__descr'),
	inputImageURL = document.querySelector('.modal-profile__url');

const isImgLink = url => {
	const reg = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim;
	return reg.test(url);
};

const setProfile = event => {
	const name = inputName.value;
	const descr = inputDescr.value;
	let imageURL = inputImageURL.value;

	if (name) {
		userNameElem.textContent = name;

		if (descr) userDescriptionElem.textContent = descr;
		else userDescriptionElem.textContent = '';

		if (isImgLink(imageURL)) userImageElem.src = imageURL;
		else {
			userImageElem.src = './img/placeholder-profile.png';
			imageURL = '';
		}

		localStorage.setItem('user', JSON.stringify({ name, descr, imageURL }));
	}
};

const getProfile = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user) {
		inputName.value = userNameElem.textContent = user.name;

		if (user.descr) {
			inputDescr.value = userDescriptionElem.textContent = user.descr;
		}

		if (user.imageURL) {
			inputImageURL.value = userImageElem.src = user.imageURL;
		}
	}
};

window.onload = () => {
	getProfile();
};

saveProfileBtn.addEventListener('click', setProfile);
// -----------------------------------------------------------------------------------//

// Cards
