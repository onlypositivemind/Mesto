import isImgLink from '../helper/testLink.js';

const userNameElem = document.querySelector('.profile__name'),
	userDescriptionElem = document.querySelector('.profile__description'),
	userImageElem = document.querySelector('[alt = "Profile image"]'),
	inputName = document.querySelector('.modal-profile__name'),
	inputDescr = document.querySelector('.modal-profile__descr'),
	inputImageURL = document.querySelector('.modal-profile__url');

const setProfile = () => {
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
		inputDescr.value = userDescriptionElem.textContent = user.descr;

		if (user.imageURL) {
			inputImageURL.value = userImageElem.src = user.imageURL;
		}
	}
};

export { setProfile, getProfile };
