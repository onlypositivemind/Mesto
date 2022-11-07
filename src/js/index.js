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

		if (user.descr) {
			inputDescr.value = userDescriptionElem.textContent = user.descr;
		}

		if (user.imageURL) {
			inputImageURL.value = userImageElem.src = user.imageURL;
		}
	}
};

saveProfileBtn.addEventListener('click', setProfile);
// -----------------------------------------------------------------------------------//

// Cards
const addCardBtn = document.querySelector('.modal-card__save'),
	cardsContainer = document.querySelector('.cards__container'),
	inputCardDescr = document.querySelector('.modal-card__descr'),
	inputCardURL = document.querySelector('.modal-card__url');

const templateCard = (url, text, id) =>
	`
<div class="cards__card card" id="${id}">
	<div class="card__image">
		<img src=${url} alt=${text}>
	</div>
	<div class="card__content">
		<p class="card__title">${text}</p>
		<div class="card__buttons">
			<button class="card__delete" data-type="delete">
				<img src="./img/icons/cross-card.svg" alt="cross" data-type="delete">
			</button>
			<button class="card__like" data-type="like">
				<img class="like" src="./img/icons/heart.svg" alt="like" data-type="like">
			</button>
		</div>
	</div>
</div>
	`;

const setCard = () => {
	let descr = inputCardDescr.value,
		imageURL = inputCardURL.value;
	const cardsData = localStorage.getItem('cards');

	if (isImgLink(imageURL) && descr) {
		const id = new Date().getTime();

		cardsContainer.insertAdjacentHTML(
			'afterbegin',
			templateCard(imageURL, descr, id)
		);

		if (cardsData) {
			const cards = JSON.parse(cardsData);
			cards.push({ id, descr, imageURL, liked: false });
			localStorage.setItem('cards', JSON.stringify(cards));
		} else {
			const cards = [];
			cards.push({ id, descr, imageURL, liked: false });
			localStorage.setItem('cards', JSON.stringify(cards));
		}
	}

	descr = '';
	imageURL = '';
};

const getCards = () => {
	const cards = JSON.parse(localStorage.getItem('cards'));
	if (cards) {
		cards.forEach(card =>
			cardsContainer.insertAdjacentHTML(
				'afterbegin',
				templateCard(card.imageURL, card.descr, card.id)
			)
		);
	}
};

addCardBtn.addEventListener('click', setCard);

const deleteCardFromLocalStorage = target => {
	const id = target.closest('.card').getAttribute('id');
	let cards = JSON.parse(localStorage.getItem('cards'));

	cards = cards.filter(card => card.id.toString() !== id);

	localStorage.setItem('cards', JSON.stringify(cards));
};

const handlerCardLike = target => {
	const id = target.closest('.card').getAttribute('id');
	let cards = JSON.parse(localStorage.getItem('cards'));

	cards = cards.map(card => {
		if (card.id.toString() === id) {
			return { ...card, liked: !card.liked };
		} else {
			return card;
		}
	});

	localStorage.setItem('cards', JSON.stringify(cards));
};

const handlerImage = (target, img) => {
	if (target && img) {
		const id = target.closest('.card').getAttribute('id');
		let cards = JSON.parse(localStorage.getItem('cards'));
		cards.forEach(card => {
			if (card.id.toString() === id) {
				if (card.liked === true) {
					img.src = './img/icons/filled-heart.svg';
				} else {
					img.src = './img/icons/heart.svg';
				}
			}
		});
	} else {
		let cards = JSON.parse(localStorage.getItem('cards'));
		if (cards) {
			cards.forEach(card => {
				if (card.liked) {
					document
						.getElementById(`${card.id}`)
						.querySelector('.like').src = './img/icons/filled-heart.svg';
				}
			});
		}
	}
};

document.addEventListener('click', event => {
	const target = event.target;
	const type = target.dataset.type;

	if (type === 'delete') {
		target.closest('.card').remove();
		deleteCardFromLocalStorage(target);
	}

	if (type === 'like') {
		handlerCardLike(target);
		const img = target.closest('img');
		handlerImage(target, img);
	}
});

window.onload = () => {
	getProfile();
	getCards();
	handlerImage();
};
