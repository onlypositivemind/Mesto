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

const saveProfileBtn = document.querySelector('.modal-profile__save'),
	userName = document.querySelector('.profile__name'),
	userDescription = document.querySelector('.profile__description'),
	userImage = document.querySelector('[alt = "Profile image"]');

const isImgLink = url => {
	const reg = /^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim;
	return reg.test(url);
};

const setProfile = event => {
	const modal = event.target.parentElement,
		name = modal.querySelector('.modal-profile__name').value,
		descr = modal.querySelector('.modal-profile__descr').value;
	let imageURL = modal.querySelector('.modal-profile__url').value;

	if (name) {
		userName.textContent = name;

		if (descr) userDescription.textContent = descr;
		else userDescription.textContent = '';

		if (isImgLink(imageURL)) userImage.src = imageURL;
		else imageURL = '';

		localStorage.setItem('user', JSON.stringify({ name, descr, imageURL }));
	}
};

saveProfileBtn.addEventListener('click', setProfile);

const getProfile = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	if (user) {
		userName.textContent = user.name;
		userDescription.textContent = user.descr;
		if (user.imageURL) userImage.src = imageURL;
	}
};

window.onload = () => {
	getProfile();
};
