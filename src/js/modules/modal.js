const modalController = ({ modal, btnOpen, btnClose }) => {
	const buttonElem = document.querySelectorAll(btnOpen),
		modalElem = document.querySelector(modal),
		saveElem = document.querySelectorAll('.modal__save-btn'),
		bodyElem = document.body;

	const closeModal = event => {
		if (
			event.target === modalElem ||
			(btnClose && event.target.closest(btnClose)) ||
			event.code === 'Escape' ||
			event.target === saveElem[0] ||
			event.target === saveElem[1]
		) {
			bodyElem.classList.remove('hidden');
			modalElem.classList.add('hidden');
		}
	};

	const openModal = () => {
		bodyElem.classList.add('hidden');
		modalElem.classList.remove('hidden');
		window.addEventListener('keydown', closeModal);
	};

	buttonElem.forEach(button => button.addEventListener('click', openModal));
	modalElem.addEventListener('click', closeModal);
};

export default modalController;
